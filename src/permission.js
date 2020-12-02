import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 路由白名单
const whiteList = ['/login','/index/index']


// 全局路由导航守卫
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  //console.log({ 'to': to})
  if(to.query && to.query.loginSecret) {
    // this.loading = true
    store.dispatch('user/logind3', { 'loginSecret': to.query.loginSecret})
    // .then(() => {
    //   // get cache list
    //   this.$store.dispatch('cache/getCacheList').catch(() => {
    //     console.log('获取缓存列表出错！')
    //   })
    // })
    // .then(() => {
    //   // get cache tree
    //   this.$store.dispatch('cache/getCacheTree').catch(() => {
    //     console.log('获取缓存树出错！')
    //   })
    // })
    .then(() => {
      // if(this.redirect) this.$store.commit('zc/CHANGE_NAV_ACTIVE', ('/'+this.redirect.split('/')[1]))
      // this.$router.push({ path: this.redirect || '/' })

      // 登录成功后去除登录参数
      next(to.path)
      NProgress.done()
    }).catch((error) => {
      Message.error(error || '自动登录出错，请返回来源页重新登陆~')
      NProgress.done()
    })
  }
  // console.log("to",to)
  // console.log("from",from)
  // console.log("next",next)

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          console.log("router", router, "accessRoutes", accessRoutes);
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          // Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    // console.log(to.path)
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

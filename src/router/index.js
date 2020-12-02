import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    // name: 'index',
    meta: { title: '首页', icon: 'example' },
    hidden: true
  },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  // 外联例子
  {
    path: '/index',
    component: Layout,
    redirect: '/index/index',
    meta: { title: '首页', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/index/index'),
        meta: { title: '首页', icon: 'home' }
      }
    ]
  },

  // {
  //   path: '/zbss2',
  //   component: Layout,
  //   redirect: '/zbss2/doc-detail',
  //   meta: { title: '搜索详情页', icon: 'example' },
  //   children: [
  //     {
  //       path: 'doc-detail',
  //       name: 'doc-detail',
  //       component: () => import('@/views/zbss/doc-detail'),
  //       meta: { title: '搜索详情页', icon: 'search' }
  //     }
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]



/**
 * asyncRoutes:需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  // {
  //   path: '/zbdy',
  //   component: Layout,
  //   redirect: '/zbdy/index',
  //   meta: { title: '招标订阅', icon: 'example', roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'zbdy',
  //       component: () => import('@/views/zbdy/index'),
  //       meta: { title: '招标订阅', icon: 'date' }
  //     }
  //   ]
  // },
  {
    path: '/zbss',
    component: Layout,
    redirect: '/zbss/index',
    meta: { title: '招标搜索', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'zbss',
        component: () => import('@/views/zbss/index'),
        meta: { title: '招标搜索', icon: 'search', noCache: true }
      },
      {
        path: 'doc-detail',
        name: 'doc-detail',
        component: () => import('@/views/zbss/doc-detail'),
        meta: { title: '搜索详情页', icon: 'search' }
      }
    ]
  },
  {
    path: '/zzfw',
    component: Layout,
    redirect: '/zzfw/index',
    meta: { title: '增值服务', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'zzfw',
        component: () => import('@/views/zzfw/index'),
        meta: { title: '增值服务', icon: 'date' }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    hidden: true,
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      // {
      //   path: '401',
      //   component: () => import('@/views/error-page/401'),
      //   name: 'Page401',
      //   meta: { title: 'page401', noCache: true }
      // },
      {
        path: '404',
        component: () => import('@/views/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
// store.dispatch('permission/initRoutes', constantRoutes)

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

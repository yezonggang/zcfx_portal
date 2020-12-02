import { login, logout, getInfo,refreshToken, getListFuzzy, saveOrUpdate, deleteById } from '@/api/sys/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
/* 系统用户信息存储设置 */ 
const getDefaultState = () => {
  return {
    token: getToken(),
    userId:'',
    name: '',
    avatar: '',
    //light
    introduction: '',
    roles: [],
    organName: '',
    userlist: []
  }
}

const state = getDefaultState()
// vuex 同步操作
const mutations = {
  // 向vuex中设置token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 向vuex中设置用户介绍(参考下方actions中的getInfo方法)
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  // 向vuex中设置用户id
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  // 向vuex中设置用户名称
  SET_NAME: (state, name) => {
    state.name = name
  },
  // 向vuex中设置用户头像
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  // 向vuex中设置用户角色列表
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  // 向vuex中设置用户所属组织机构
  SET_ORGAN: (state, organName) => {
    state.organName = organName
  },
  // ？？？
  SET_USER_LIST: (state, userlist) => {
    state.userlist = userlist
  },
}

// vuex 异步操作
const actions = {
  // 用户登陆
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ loginName: username.trim(), passwd: password }).then(response => {
        const data = response
        commit('SET_TOKEN', data)
        setToken(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 第三方用户登录
  logind3({ commit }, userInfo) {
    const { loginSecret } = userInfo
    return new Promise((resolve, reject) => {
      login({ loginSecret: loginSecret.trim() }).then(response => {
        const data = response
        commit('SET_TOKEN', data)
        setToken(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  refreshToken({commit}) {
    return new Promise((resolve, reject) => {
      // 确保同一时间段内只执行一次
      const refreshTokenStatus = localStorage.getItem('refreshTokenStatus')
      if (!refreshTokenStatus) {
        localStorage.setItem('refreshTokenStatus', 'true')
        refreshToken().then(response => {
         
          const data = response
          //console.log("刷新完成，开始更新token",data)
          commit('SET_TOKEN', data)
          setToken(data)
          // 请求成功，清除状态值
          localStorage.removeItem('refreshTokenStatus')
          resolve()
        }).catch(error => {
          // 请求成功，清除状态值
          localStorage.removeItem('refreshTokenStatus')
          reject(error)
        })
      }
    })
  },
  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const data = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { organName, roles, userId, userName, avatar } = data

        // 用户角色不能为空
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        let roleTypes = roles.map((role) => {
          return role.roleType
        })
        commit('SET_USERID',userId)
        commit('SET_ORGAN', organName)
        commit('SET_ROLES', roleTypes)
        commit('SET_NAME', userName)
        commit('SET_AVATAR', avatar)
        // commit('SET_INTRODUCTION', introduction)
        data.roles = roleTypes
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户退出
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()

      // 重置用户视图 这是vue-el-admin 的，本工程不存在
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      // dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
    })
  },
  // 移除vuex中存储的token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // 动态修改权限
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      //dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  },
  getListFuzzy({ commit }, param) {
    return new Promise((resolve, reject) => {
      getListFuzzy(param).then(response => {
        const data = response
        commit('SET_USER_LIST', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  saveOrUpdate({ dispatch, commit }, userInfo) {
    return new Promise((resolve, reject) => {
      saveOrUpdate(userInfo).then(response => {
        const data = response
        console.log(data)
        // dispatch('user/getListFuzzy')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteById({ commit }, id) {
    return new Promise((resolve, reject) => {
      deleteById(id).then(response => {
        const data = response
        // console.log(data)
        // commit('DEL_USER', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


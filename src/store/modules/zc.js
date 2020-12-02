
const state = {
  navBackgroundColor: '#fff;',
  navTextColor: '#000',
  navActive:'/index'
}

const mutations = {
  // 导航条背景颜色
  CHANGE_NV_BG_COLOR(state, payload) {
    state.navBackgroundColor = payload
  },
  // 导航条文本颜色
  CHANGE_NAV_TEXT_COLOR(state, payload) {
    state.navTextColor = payload
  },
  // 导航条激活选项
  CHANGE_NAV_ACTIVE(state, payload) {
    state.navActive = payload
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  // actions
}

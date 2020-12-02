
import { getCacheList, getCacheTree } from "@/api/sys/caches"


const getDefaultState = () => {
  return {
    cacheTree: [],
    cacheList: []
  }
}

const state = getDefaultState()

const mutations = {
  SET_CACHE_TREE: (state, cacheTree) => {
    state.cacheTree = cacheTree
  },
  SET_CACHE_LIST: (state, cacheList) => {
    state.cacheList = cacheList
  },
  SET_SELECTED_CACHE: (state, selectedCache) => {
    state.selectedCache = selectedCache
  }
}

const actions = {
  // cacheTree
  getCacheTree({ commit }) {
    return new Promise((resolve, reject) => {
      getCacheTree().then(response => {
        const data = response
        console.log(data)
        commit('SET_CACHE_TREE', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // cacheList
  getCacheList({ commit }, cacheType) {
    return new Promise((resolve, reject) => {
      getCacheList().then(response => {
        // debugger
        // 保存token
        const data = response
        commit('SET_CACHE_LIST', data)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
    // eslint-disable-next-line comma-dangle
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


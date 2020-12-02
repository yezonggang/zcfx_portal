import { getById, getList, getPageListFuzzy, saveOrUpdate } from '@/api/sys/role'

const getDefaultState = () => {
    return {
        role: {},
        roleList: []
    }
}

const state = getDefaultState()

const mutations = {
    SET_ROLE: (state, role) => {
        state.role = role
    },
    SET_ROLE_LIST: (state, roleList) => {
        state.roleList = roleList
    }
}

const actions = {

    getPageListFuzzy({ commit }, param) {
        return new Promise((resolve, reject) => {
            getPageListFuzzy(param).then(response => {
                const data = response
                commit('SET_ROLE_LIST', data)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    saveOrUpdate({ dispatch, commit }, param) {
        return new Promise((resolve, reject) => {
            saveOrUpdate(param).then(response => {
                const data = response
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getById({ commit }, id) {
        return new Promise((resolve, reject) => {
            getById(id).then(response => {
                const data = response
                commit('SET_ROLE', data)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}


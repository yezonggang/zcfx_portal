import { getById, getList, getListFuzzy, saveOrUpdate } from '@/api/sys/organ'

const getDefaultState = () => {
    return {
        organ: {},
        organList: []
    }
}

const state = getDefaultState()

const mutations = {
    SET_ORGAN: (state, organ) => {
        state.organ = organ
    },
    SET_ORGAN_LIST: (state, organList) => {
        state.organList = organList
    }
}

const actions = {

    getListFuzzy({ commit }, param) {
        return new Promise((resolve, reject) => {
            getListFuzzy(param).then(response => {
                const data = response
                commit('SET_ORGAN_LIST', data)
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
                commit('SET_ORGAN', data)
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


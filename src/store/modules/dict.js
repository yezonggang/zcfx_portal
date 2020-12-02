import { getById, getList, getListFuzzy, saveOrUpdate } from '@/api/sys/dict'

const getDefaultState = () => {
return {
dict: {},
dictList: []
}
}

const state = getDefaultState()

const mutations = {
SET_DICT: (state, dict) => {
state.dict = dict
},
SET_DICT_LIST: (state, dictList) => {
state.dictList = dictList
}
}

const actions = {

getListFuzzy({ commit }, param) {
return new Promise((resolve, reject) => {
getListFuzzy(param).then(response => {
const data  = response
commit('SET_DICT_LIST', data)
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
commit('SET_DICT', data)
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


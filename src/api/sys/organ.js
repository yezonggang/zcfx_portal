import request from '@/utils/request'



/**
* 查询LtSysOrgan列表 （精确查询）
* @param {*} data 查询条件
*/
export function getList(data) {
return request({
url:  '/organ',
method: 'get',
params: data
})
}

/**
* 查询LtSysOrgan列表 （模糊查询）
* @param {*} data 查询条件
*/
export function getListFuzzy(data) {
return request({
url:  '/organ/fuzzy',
method: 'get',
params: data
})
}

/**
* 保存或者更新LtSysOrgan
* @param {*} data LtSysOrgan信息
*/
export function saveOrUpdate(data) {
return request({
url:  '/organ',
method: 'post',
data
})
}

/**
* 根据 ID 查询LtSysOrgan信息
* @param {*}  id LtSysOrganID
*/
export function getById(id) {
return request({
url:  '/organ/{id}',
method: 'get'
})
}

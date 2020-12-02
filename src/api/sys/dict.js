import request from '@/utils/request'



/**
* 查询LtSysDictEspecial列表 （精确查询）
* @param {*} data 查询条件
*/
export function getList(data) {
return request({
url:  '/dict',
method: 'get',
params: data
})
}

/**
* 查询LtSysDictEspecial列表 （模糊查询）
* @param {*} data 查询条件
*/
export function getListFuzzy(data) {
return request({
url:  '/dict/fuzzy',
method: 'get',
params: data
})
}

/**
* 保存或者更新LtSysDictEspecial
* @param {*} data LtSysDictEspecial信息
*/
export function saveOrUpdate(data) {
return request({
url:  '/dict',
method: 'post',
data
})
}

/**
* 根据 ID 查询LtSysDictEspecial信息
* @param {*}  id LtSysDictEspecialID
*/
export function getById(id) {
return request({
url:  '/dict/{id}',
method: 'get'
})
}

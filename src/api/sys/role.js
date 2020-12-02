import request from '@/utils/request'
import { sysPath } from "@/api/pathConfig";


export function getRoutes() {
  return request({
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}


/**
 * 查询LtSysRole列表 （精确查询）
 * @param {*} data 查询条件
 */
export function getList(data) {
  return request({
    url: sysPath + '/role',
    method: 'get',
    params: data
  })
}

/**
 * 分页查询LtSysRole列表 （模糊查询）
 * @param {*} data 查询条件
 */
export function getPageList(data) {
  return request({
    url: sysPath + '/role/page',
    method: 'get',
    params: data
  })
}
/**
 * 分页查询LtSysRole列表 （模糊查询）
 * @param {*} data 查询条件
 */
export function getPageListFuzzy(data) {
  return request({
    url:  sysPath + '/role/page/fuzzy',
    method: 'get',
    params: data
  })
}
/**
 * 保存或者更新LtSysRole
 * @param {*} data LtSysRole信息
 */
export function saveOrUpdate(data) {
  return request({
    url: sysPath + '/role',
    method: 'post',
    data
  })
}

/**
 * 根据 ID 查询LtSysRole信息
 * @param {*}  id LtSysRoleID
 */
export function getById(id) {
  return request({
    url: sysPath + '/role/{id}',
    method: 'get'
  })
}
/**
 * 根据 ID 删除用户信息
 * @param {*}  id  用户ID
 */
export function deleteById(id) {
  return request({
    url: sysPath + '/role/' + id,
    method: 'delete'
  })
}

import { sysPath, uapPath } from '@/api/pathConfig'
import request from '@/utils/request'

export function login(data) {
  return request({
    url: uapPath + '/user/launcher',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: uapPath + '/user/info',
    method: 'get',
    params: { token }
  })
}

export function refreshToken(token) {
  return request({
    url: uapPath + '/user/refreshToken',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: uapPath + '/user/logout',
    method: 'get'
  })
}
/**
 * 查询用户列表 （精确查询）
 * @param {*} data 查询条件
 */
export function getList(data) {
  return request({
    url: sysPath+'/user',
    method: 'get',
    params: data
  })
}

/**
 * 查询用户列表 （模糊查询）
 * @param {*} data 查询条件
 */
export function getListFuzzy(data) {
  return request({
    url: sysPath + '/user/fuzzy',
    method: 'get',
    params: data
  })
}
/**
 * 保存或者更新 用户
 * @param {*} data 用户信息
 */
export function saveOrUpdate(data) {
  return request({
    url: sysPath +'/user',
    method: 'post',
    data
  })
}
/**
 * 根据 ID 查询用户信息
 * @param {*}  id 用户ID
 */
export function getById(id) {
  return request({
    url: sysPath + `/user/{id}`,
    method: 'get'
  })
}

/**
 * 根据 ID 删除用户信息
 * @param {*}  id  用户ID
 */
export function deleteById(id) {
  return request({
    url: sysPath + '/user/'+ id,
    method: 'delete'
  })
}

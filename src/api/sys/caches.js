import request from '@/utils/request'
import { sysPath, uapPath } from '@/api/pathConfig'
export function getCacheList(data) {
  return request({
    url: sysPath + '/caches',
    method: 'get',
    params: data
  })
}
export function getCacheTree(data) {
  return request({
    url: sysPath + '/caches/tree',
    method: 'get',
    params: data
  })
}

import request from '@/utils/request'
const es = process.env.VUE_APP_BASE_API_ES

const dataway = process.env.VUE_APP_BASE_API +"data"

// 招标项目信息搜索(公告与招投标文件)
export function getList(params) {
  return request({
    url: es + '/allsearch',
    method: 'post',
    params
  })
}

// 获取国标分类维表数据
export function getGbfl(params) {
  return request({
    url: dataway + '/api/dim/xm/xmfl',
    method: 'get',
    params
  })
}

// 根据商品名称获取商品技术参数分类数据
export function getSpjscs(params) {
  return request({
    url: dataway + '/api/ods/sp/jscs',
    method: 'get',
    params
  })
}

// 根据关键词模糊匹配获取商品技术参数分类数据
export function getSpjscs2(params) {
  return request({
    url: dataway + '/api/ods/sp/jscs2',
    method: 'get',
    params
  })
}

// 根据商品名称和技术参数查询商品明细
export function getSpmx(params) {
  return request({
    url: dataway + '/api/ods/sp/findspmx',
    method: 'get',
    params
  })
}

// 根据商品名称，技术参数 获取商品的价格走势
export function getSpdjzs(params) {
  return request({
    url: dataway + '/api/ods/sp/finddj',
    method: 'get',
    params
  })
}



// 获取已经订阅的标签
export function getSubscription(params) {
  return request({
    url: es + '/subscription/' + params,
    method: 'get',
  })
}

// 保存最新的订阅状态
export function saveSubscription(data) {
  return request({
    url: es + '/subscription',
    method: 'put',
    responseType: 'json',
    data
  })
}
//读取商品分类
export function getSpfl(params) {
  return request({
    url: dataway +'/api/dim/common/spfl',
    method: 'get',
    params
  })
}
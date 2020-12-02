const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  navBackgroundColor: state => state.zc.navBackgroundColor,
  background: state => state.background,
  navTextColor: state => state.zc.navTextColor,
  name: state => state.user.name,
  userId: state => state.user.userId,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  cacheList: state => cacheTypes => state.cache.cacheList[cacheTypes],
  cacheTree: state => cacheTypes => state.cache.cacheTree[cacheTypes],
  userById: state =>  id => state.user.userlist.records.find(user => user.userId == id),
  navActive: state => state.zc.navActive
}
export default getters

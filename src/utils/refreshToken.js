import store from '@/store'
export async function refreshToken() {
    // 最后刷新记录时间
    const lastRefreshToken = localStorage.getItem("lastRefreshToken")
    if(!lastRefreshToken){
      //console.log("最后刷新时间不存在，直接刷新")
      await store.dispatch('user/refreshToken').then(() => {
        localStorage.setItem('lastRefreshToken',new Date().getTime())
        // console.log("刷新tokne成功")
        return 'success'
      }).catch(function(err){
        return ''
      })
    }else{
      
      const currentDate =  new Date().getTime()
      //console.log("最后刷新时间存在，直接刷新",lastRefreshToken)
      // 1分钟之内只能续期一次
      if(currentDate-Number(lastRefreshToken)>1 * 1000 * 60){
        store.dispatch('user/refreshToken').then(() => {
          localStorage.setItem('lastRefreshToken',new Date().getTime())
          //console.log("刷新tokne成功")
          return 'success'
        }).catch(function(err){
            return ''
          })
     }else{
       //console.log("1分钟之内只能续期一次",(currentDate-Number(lastRefreshToken)))
       return ''
     }
    }
}

//ajaxPrefilter()是在调用Ajax时候提前调用此函数
$.ajaxPrefilter(function (options) {

    options.url = 'http://ajax.frontend.itheima.net'+options.url
    

    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization:localStorage.getItem('ID') || ''
        }
    }
   

    //设置用户登录权限，必须要经过登录页面才可以登录
    options.complete =  function (res) {

        //判断是否获取用户信息成功
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {

            //清除本地缓存
            localStorage.removeItem('ID')

            //强制退出登录界面
            location.href = '/login.html'
        }
     }
})
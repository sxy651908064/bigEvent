$(function() {
    // console.log(1);
    getData ()

    $('.exit').on('click',function() {
        console.log(1);
        layer.confirm('确定退出吗?', {icon: 3, title:'提示'}, function(index){
            localStorage.removeItem('ID')
            location.href = '/login.html'
            layer.close(index);
          });
    })
})

//获取用户信息
function getData () {
    $.ajax({
        url:'/my/userinfo',
        headers: {
            Authorization:localStorage.getItem('ID')
        },
        success:function (res) {
           
            if (res.status == 0) {
                swich_header(res.data)
            } else {
                return false
            }  
        }
        
    })
}

//渲染头像
function swich_header(data) {
    $('.welcome').html('欢迎&nbsp&nbsp'+data.username)
    
    if(data.user_pic !== null) {
        $('.layui-nav-img').attr('src',data.user_pic).show()
        return $('.head_img').hide()
    }else {
        $('.layui-nav-img').hide()
        var profile = data.username[0].toUpperCase()
        $('.head_img').html(profile)
    }
}
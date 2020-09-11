$(function () {
    $('.login_left').on('click',function () {
        $('.login_regist_box_regist').hide()
        $('.login_regist_box_link').show()
    })

    $('.login_right').on('click',function () {
        $('.login_regist_box_link').hide()
        $('.login_regist_box_regist').show()
    })


    //给表单添加验证属性，使用的是layui内置属性
    var form = layui.form
    form.verify({

        password: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],

        repassword:function(value) {

            var pwd = $('.login_regist_box_link [name="password"]').val()
            

            if (pwd != value) {
                return '两次密码不一样';
            }
        }
    })



    var layer = layui.layer
    //给注册事件添加后台管理
    $('#form_reg').on('submit',function(e) {
        
        //阻止默认行为
        e.preventDefault()
        
        //发去Ajax请求，提交后台数据
        $.ajax({
            url:'http://ajax.frontend.itheima.net/api/reguser',
            type:'post',
            data:{
                username: $('#form_reg [name="username"]').val(),
                password: $('#form_reg [name="password"]').val()
            },
            success: function(res) {

                //确定是否
                if(res.status == 1) {
                    layer.msg('用户名被占用，请更换其他用户名！')
                } else {
                    layer.msg('注册成功！')
                    $('.login_right').click()
                }
            }
        })
    })


    //登录主页面
    $('#form_login').on('submit',function(e) {

        //组织表单默认事件
        e.preventDefault()

        //发起Ajax请求
        $.ajax({
            url:'http://ajax.frontend.itheima.net/api/login',
            type:'post',
            data:$(this).serialize(),
            success: function(res) {
                console.log(res);
                if(res.status == 1) {
                    layer.msg('登录失败！')
                } else {
                    layer.msg('登录成功！')
                    localStorage.setItem('ID',res.token)
                    location.href('/index.html')
                }
            }
        })
    })


    
    

})











/**
 * 目标1：验证码登录
 * 1.1 在 utils/request.js 配置 axios 请求基地址
 * 1.2 收集手机号和验证码数据
 * 1.3 基于 axios 调用验证码登录接口
 * 1.4 使用 Bootstrap 的 Alert 警告框反馈结果给用户
 */

//1.2 收集手机号和验证码数据
document.querySelector('.btn-primary').addEventListener('click',()=>{
    const form = document.querySelector('.login-form')
    const data = serialize(form,{hash:true,empty:true})
    console.log(data);
    //1.3 基于 axios 调用验证码登录接口
    axios({
        url:'/v1_0/authorizations',
        method:'POST',
        data:data
    }).then(result=>{
        //1.4 使用 Bootstrap 的 Alert 警告框反馈结果给用户
        console.log(result);
        myAlert(true, '登录成功')
        // auth.j中1.2 登录成功后，保存 token 令牌字符串到本地，并跳转到内容列表页面
        //localStorage.setItem('token',result.data.token)
        //响应拦截器那进行优化后，直接使用data.token就可以了
        localStorage.setItem('token',result.data.token)
        setTimeout(()=>{
            //延迟跳转，让alert警告框停留一会儿
            location.href = '../content/index.html'
        },2000)
    }).catch(error=>{
        myAlert(false,error.response.data.message)
        console.log(error.response.data.message);
    })
})
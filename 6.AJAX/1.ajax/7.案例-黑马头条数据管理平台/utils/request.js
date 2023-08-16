// axios 公共配置
// 基地址
// 作用：提取公共前缀地址，配置后axios请求时都会baseURL+url
axios.defaults.baseURL = 'https://geek.itheima.net'

//请求拦截器和响应拦截器就是当多个页面有相同的请求或响应状况时，可以进行统一的处理
//添加请求拦截器
axios.interceptors.request.use(config => {
    //在发送请求前做些什么
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = `Bearar ${token}`)
    return config;
    },error => {
    // Do something with request error
    return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use(response => {
    //2XX范围内的状态码都会触发该函数
    //对响应数据做些什么操作
    //优化响应结果,每个页面就不用result.data.data去访问数据
    const result = response.data
    return result;
    },error => {
    //超过2XX范围的状态码都会触发该函数
    //对响应错误做点什么，例如：判断响应状态为401代表身份验证失败
    //?.链式调用，防止error中没有response，status属性而报错
    if(error?.response?.status===401){
        alert('登录状态过期,请重新登录')
        localStorage.clear()
        location.href = '..login/index.html'
    }
    return Promise.reject(error);
});
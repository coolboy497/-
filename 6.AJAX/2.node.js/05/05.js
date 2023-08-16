//端口号的作用:标记区分服务器里的不同服务程序
//web服务程序:提供网上信息浏览的程序代码
//http协议默认访问80端口

//http模块-创建web服务
//需求：创建web服务并响应内容给浏览器
//1.加载http模块,创建web服务对象
//2.监听request请求事件,设置响应头和请求体
//3.配置端口号并启动web服务
//4.浏览器请求http://localhost:3000进行测试

//1.加载http模块,创建web服务对象
const http = require('http')
const server = http.createServer()
//2.监听request请求事件,设置响应头和请求体
server.on('request',(req,res)=>{
    //设置响应头-内容类型-普通文本以及中文编码格式
    res.setHeader('Content-Type','text/plain;charset=utf-8')
    //设置响应体内容，结束本次请求与响应,有中文字符要设置编码格式
    res.end('欢迎使用node.js和http模块创建的web服务')
})
//3.配置端口号并启动web服务
server.listen(3000,()=>{
    console.log('web 服务启动成功了');
})
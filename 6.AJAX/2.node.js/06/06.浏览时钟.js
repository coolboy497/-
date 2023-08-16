// 基于web服务，开发提供网页资源的功能
// 1.基于http模块，创建web服务
// 2.使用req.url获取请求资源路径，并读取index.html里字符串内容返回给请求方
// 3.其他路径,暂时返回不存在提示
// 4.运行web服务,用浏览器发起请求

const fs = require('fs')
const path = require('path')
// 1.基于http模块，创建web服务
const http = require('http')
const server = http.createServer()
server.on('request',(req,res)=>{
    // 2.使用req.url获取请求资源路径，并读取index.html里字符串内容返回给请求方
    if(req.url==='/index.html'){
        fs.readFile(path.join(__dirname,'dist/index.html'),(err,data)=>{
            if(err)console.log(err);
            else{
                res.setHeader('Content-Type','text/html;charset=utf-8')
                res.end(data.toString())
            }
        })
    }
    // 3.其他路径,暂时返回不存在提示
    else{
        res.setHeader('Content-Type','text/html;charset=utf-8')
        res.end('你要访问的资源路径不存在')
    }
})
// 4.运行web服务,用浏览器发起请求
server.listen(3000,()=>{
    console.log('web 服务启动成功了');
})
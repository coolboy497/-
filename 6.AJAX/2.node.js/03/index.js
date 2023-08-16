// 在node.js中，相对路径是根据终端所在路径进行查找的，可能无法找到你想要的文件
// 强烈在node.js中，使用绝对路径
// __dirname内置变量（获取当前模块目录-绝对路径）是两个下划线
// path.join()会使用特定于平台的分隔符，作为定界符，将所有给定的路径片段连接在一起
// window由反斜线连接路径，mac由斜线连接路径，上述可以解决这个问题

const fs = require('fs')
//1.引入path模块对象
const path = require('path')
//2.调用path.join()配合__dirname组成目标文件的绝对路径
console.log(__dirname);
fs.readFile(path.join(__dirname,'../test.txt'),(err,data)=>{
    if(err)console.log(err);
    //data 是buffer 16进制数据流对象
    //.toString()转换成字符串
    else console.log(data.toString());
})
//fs模块-读写文件，模块：类似插件，封装了方法/属性
//语法：1.加载fs模块对象 2.写入文件内容 3.读取文件内容
//1.加载fs模块对象
const fs = require('fs')
//2.写入文件内容 
fs.writeFile('./test.txt','hello,node.js',(err)=>{
    if(err)console.log(err);
    else console.log('写入成功!');
})
//3.读取文件内容
fs.readFile('./test.txt',(err,data)=>{
    if(err)console.log(err);
    //data 是buffer 16进制数据流对象
    //.toString()转换成字符串
    else console.log(data.toString());
})
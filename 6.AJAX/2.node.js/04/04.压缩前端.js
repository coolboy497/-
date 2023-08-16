// 案例-压缩前端HTML
// 需求：把回车符(\r)和换行符(\n)去掉后，写入到新HTML文件中
// 1.读取源html文件内容
// 2.正则替换字符串
// 3.写入到新的HTML文件中
const fs = require('fs')
const path = require('path')
// 1.读取源html文件内容
fs.readFile(path.join(__dirname,'public/index.html'),(err,data)=>{
    if(err)console.log(err);
    else{
        // console.log(data.toString());
        const htmlStr = data.toString()
        // 2.正则替换字符串
        const resultStr = htmlStr.replace(/[\r\n]/g,'')
        console.log(resultStr);
        // 3.写入到新的HTML文件中
        fs.writeFile(path.join(__dirname,'dist/index.html'),resultStr,(err)=>{
            if(err)console.log(err);
            else console.log('写入成功');
        })
    }
})
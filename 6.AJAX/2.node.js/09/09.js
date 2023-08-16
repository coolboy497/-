// npm是node.js标准的软件包管理器(下载软件包以及管理版本)
// 它起初是作为下载和管理node.js包依赖的方式
// 但其现在也已成为前端JavaScript中使用的工具

// 使用：
// 1.初始化清单文件:npm init -y(得到package.json文件，有则略过此命令)
// 2.下载软件包:npm i 软件包名称
// 3.使用软件包

//内置模块和npm下载的模块直接写名字
//自己创建的文件需要写路径
const dayjs = require('dayjs')
const nowDateStr = dayjs().format('YYYY-MM-DD')
console.log(nowDateStr);

// npm-全局软件包 nodemon
// 软件包区别：
// 本地软件包:当前项目内使用，封装属性和方法，存在于node_modules
// 全局软件包:本机所有项目使用,封装命令和工具，存在于系统设置的位置

// nodemon作用:替代node命令,检查代码更改,自动重启程序
// 安装：npm i nodemon -g(-g代表安装到全局环境中)
// 运行: nodemon待执行的js文件


// 格式化日期
const dayjs = require('dayjs')
const nowDateStr = dayjs().format('YYYY-MM-DD')
console.log(nowDateStr)

// 求数组里最大值
const _ = require('lodash')
console.log(_.max([1, 2, 8, 3, 4, 54]))
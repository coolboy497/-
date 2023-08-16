// 模块化简介
// 在node.js中,每个文件都被视为一个单独的模块 
// 概念:项目是由很多个模块文件组成的
// 好处:提高代码复用性,按需加载,独立作用域
// 使用:需要标准语法导出和导入进行使用
// 导出：module.exports={}  导入:require("模块名或者路径")

// 需求：定义utils.js模块,封装基地址和求数组总和的函数
// node.js支持的两种模块化标准:CommonJs和ECMAScript

// const baseURL='http://hmajax.itheima.net'
// const getArraySum = arr => arr.reduce((sum,item)=>sum+=item,0)

//导出,node.js默认支持的CommonJS语法
// module.exports = {
//     url:baseURL,
//     arraySum:getArraySum
// }

//ECMAscript标准 默认导出和导入
//使用ECMAscript标准语法，需要在运行模块所在文件夹
//新建package.json文件,并设置{"type":"module"}
// export default{
//     url:baseURL,
//     arraySum:getArraySum
// }

//ECMAscript标准 命名导出和导入
//命名标准使用：导出->export 修饰定义语句

// const baseURL='http://hmajax.itheima.net'
export const getArraySum = arr => arr.reduce((sum,item)=>sum+=item,0)


//按需加载，使用命名导出和导入
//全部加载，使用默认导出和导入
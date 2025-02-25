// 模块化简介
// 在node.js中,每个文件都被视为一个单独的模块 
// 概念:项目是由很多个模块文件组成的
// 好处:提高代码复用性,按需加载,独立作用域
// 使用:需要标准语法导出和导入进行使用
// 导出：module.exports={}  导入:require("模块名或者路径")

// 需求：定义utils.js模块,封装基地址和求数组总和的函数

// 导入,node.js默认支持的CommonJS语法
// const obj = require('./utils.js')
// console.log(obj);
// const result = obj.arraySum([3,2,2,3])
// console.log(result);

//ECMAscript标准 默认导出和导入
//使用ECMAscript标准语法，需要在运行模块所在文件夹
//新建package.json文件,并设置{"type":"module"}
// import obj from './utils.js'
// const result1 = obj.arraySum([3,2,2,3,4,6])
// console.log(result1);

//ECMAscript标准 命名导出和导入
//命名标准使用：导入->imort{同名变量}from'模块名和路径'
import { getArraySum } from './utils.js';
console.log(getArraySum([1,1,1,1]));


//Commonjs标准:一般应用在node.js项目环境中
//ECMAScript标准:一般应用在前端工程化项目中
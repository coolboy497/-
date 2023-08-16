//包：将模块,代码,其他资料聚合成一个文件夹
//包分类：
//项目包：主要用于编写项目和业务逻辑
//软件包：封装工具和方法进行使用
//要求：根目录中必须有package.json文件（记录包的清单信息）

//导入一个包文件夹的时候，导入的是哪个文件？
//默认是index.js文件，或者是package.js文件中main属性指定的文件


//需求：封装数组求和函数的模块，判断用户名和密码长度函数的模块，形成成一个软件包
//导入utils软件包，使用里面封装的工具函数
const obj = require('./utils')
console.log(obj);
const result = obj.getArraySum([10,20,30])
console.log(result);
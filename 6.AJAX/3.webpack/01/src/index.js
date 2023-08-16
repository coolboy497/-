// 目标：体验webpack打包过程
// 1.准备项目和源代码
import { checkPhone,checkCode } from "./utils/check.js";
console.log(checkPhone('1213424412'));
console.log(checkCode('214242144'));
// 2.准备webpack打包的环境
// 3.运行自定义命令打包观察效果(npm run 自定义命令) 自定义命令是自己在package.json-》scripts定义的命令，为了在当前项目
// 运行webpack，而起的一个别名
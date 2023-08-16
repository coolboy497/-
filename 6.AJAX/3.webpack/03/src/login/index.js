// 目标：体验webpack打包过程
// 1.准备项目和源代码
import { checkPhone,checkCode } from "../utils/check.js";
// console.log(checkPhone('1213424412'));
// console.log(checkCode('214242144'));
// 2.准备webpack打包的环境
// 3.运行自定义命令打包观察效果(npm run 自定义命令) 自定义命令是自己在package.json-》scripts定义的命令，为了在当前项目
// 运行webpack，而起的一个别名


// 目标2：修改webpack打包入口和出口
// 2.1 项目根目录,新建webpack.config.js 配置文件
// 2.2 导出配置对象,配置入口,出口文件路径
// 2.3重新打包观察


// 目标3：用户登录-长度判断案例
// 3.1 准备用户登录页面
// 3.2 编写核心js逻辑代码
// 3.3 打包并手动复制网页到dist下，引入打包后的js运行

// 3.2 编写核心js逻辑代码
// document.querySelector('.btn').addEventListener('click',()=>{
//     const phone = document.querySelector('.login-form [name=mobile]').value;
//     const code = document.querySelector('.login-form [name=code]').value;
//     if(!checkPhone(phone)){
//         console.log('手机号长度必须是11位');
//         return
//     }
//     if(!checkCode(code)){
//         console.log('验证码长度必须是6位');
//         return
//     }
//     console.log('提交到服务器登录....');
// })


// 目标4:使用html-webpack-plugin插件生成html网页,并引入打包后的其他资源(这样就不需要自己去手动引入)
// 4.1下载html-webpack-plugin本地软件包 （npm -i html-webpack-plugin --save-dev）
// 4.2配置webpack.config.js让webpack拥有插件功能
// 4.3重新打包观察效果

// 目标5:打包css代码（webpack默认只识别js代码）
// 加载器css-loader：解析css代码  加载器style-loader:把解析后的css代码插入到DOM
// 5.1准备css文件代码引入到src/login/index.js中（压缩转译处理等）
// 5.2下载css-loader和style-loader本地软件包
// 5.3配置webpack.config.js让webpack拥有该加载器功能
// 5.4打包后观察效果

// 5.1准备css文件代码引入到src/login/index.js中（压缩转译处理等）
// 注意：下载bootstrap模块，就不用使用link进行链接引用
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
// 5.2下载css-loader和style-loader本地软件包


// 目标6:优化-提取css代码，让打包后的css代码不再是在js代码中（css文件可以被浏览器缓存,减少js文件体积）
// mini-css-extract-plugin:提取css代码，不能与style-loader一起使用
// 6.1 下载mini-css-extract-plugin 本地软件包
// 6.2 配置webpack.config.js 让webpack拥有该插件功能
// 6.3 打包后观察结果


// 目标7:优化-压缩过程，自己写的css代码在目标6时并没有被压缩
// css-minimizer-webpack-plugin
// 7.1下载css-minimizer-webpack-plugin软件包
// 7.2 配置webpack.config.js 让webpack拥有该插件功能
// 7.3 打包后观察结果

// 目标8:打包less代码
// 加载器less-loader:把less代码编译为css代码（less-loader需要配合less软件包使用）
// 8.1 新建less代码(背景图)并引入到src/login/index.js中
// 8.2 下载less和less-loader本地软件包
// 8.3 配置webpack.config.js 让webpack拥有该插件功能
// 8.4 打包后观察结果
import './index1.less'


// 目标9:打包图片
// webpack5内置资源模块（字体，图片等）打包，无需额外loader
// 判断临界值默认为8KB
// 大于8KB文件：发送一个单独的文件并导出URL地址，会被存到一个文件中
// 小于8KB文件：导出一个data URL(base64字符串)，会直接集成到打包后的js代码中
// 占位符【hash】对模块内容做算法计算，得到映射的数字字母组合的字符串
// 占位符【ext】使用当前模块原来的占位符，例如：.png/.jpg等字符串
// 占位符【query】保留引入文件时代码中查询参数（只有URL下生效）

// 9.1 创建img标签并动态添加到页面,配置webpack.config.js
// 9.2 配置webpack.config.js 让webpack拥有打包图片功能
// 9.3 打包后观察效果和区别
// 注意：js中引入本地图片资源要用import方式（如果是网络图片http地址，字符串可以直接写）
import imgObj from './assets/logo.png'
const theImg = document.createElement('img')
theImg.src = imgObj
document.querySelector('.login-wrap').appendChild(theImg)

// 目标10:用户登录-完成功能
// 需求：完成登录功能的核心流程，以及Alert警告框使用
// 10.1: 使用npm下载axios(体验npm作用在前端项目中)
// 10.2: 准备并修改utils工具包源代码导出实现函数
// 10.3: 导入并编写逻辑代码,打包后运行观察效果

// 10.3: 导入并编写逻辑代码,打包后运行观察效果
import myAxios from '../utils/request.js'
import { myAlert } from "../utils/alert.js";
import { Axios } from "axios";
document.querySelector('.btn').addEventListener('click',()=>{
    const phone = document.querySelector('.login-form [name=mobile]').value;
    const code = document.querySelector('.login-form [name=code]').value;
    if(!checkPhone(phone)){
        myAlert('false','手机号长度必须是11位');
        return
    }
    if(!checkCode(code)){
        myAlert('false','验证码长度必须是6位');
        return
    }
    // else{
    //     myAlert('true','提交到服务器登录....');
    // }
    //console.log('提交到服务器登录....');
    myAxios({
        url:'/v1_0/authorizations',
        method:'POST',
        data:{
            mobile:phone,
            code:code
        }
    }).then(result=>{
        myAlert('true','登陆成功');
        localStorage.setItem('token',result.data.token)
        location.href='../content/index.html'
    }).catch(error=>{
        myAlert('false',error.response.data.message);
    })
})


//目标11:搭建开发环境
//问题：之前改代码，需重新打包才能运行查看，效率很低
//开发环境:配置webpack-dev-server快速开发应用程序
//作用:启动web服务，自动检测代码变化，热更新到网页

//注意:dist目录和打包内容是在内存里(更新快)
//11.1下载webpack-dev-server软件包到当前项目
//11.2设置模式为开发模式，并配置自定义命令(跟webpack一样到package.json script配置一个自定义的局部命令，自动打开默认浏览器)
//11.3使用npm run dev启动开发服务器，查看热更新效果

//注意1：webpack-dev-server是借助http模块创建的8080默认web服务
//注意2: 默认以public文件夹作为服务器目录
//注意3：webpack-dev-server根据配置,打包相关代码在内存当中，以output.path的值作为服务器根目录
//(所以可以直接自己拼接访问dist目录下的内容)


//目标12:webpack打包模式：告知webpack使用相应模式的内置优化
//开发模式(development)：调试代码,实时加载,模块热提换等->本地开发
//生产模式(production)：压缩代码,资源优化,更轻量等->打包上线
//设置的方式:
//1.在webpack.config.js配置文件mode选型
//2.在package.json命令行设置mode参数（命令行(也就是package.json中scripts里面)设置的优先级高于配置文件）

//目标13:打包模式的应用(是否将css代码抽离出单独的文件)
//需求：在开发模式下用style-loader内嵌更快,在生产模式下提取css代码成单独文件
//方案1：webpack.config.js配置导出函数,但是局限性大(只接受2种模式)
//方案2：借助cross-env(跨平台通用)包命令,设置参数区分环境
//1.下载cross-env软件包到当前目录
//2.配置自定义命令,传入参数名和值(会绑定到process.env对象下)
//3.在webpack.config.js区分不同环境使用不同配置
//4.重新打包观察两种模式区别

//方案3：配置不同的webpack.config.js(适用多种模式差异性较大的情况)


//目标14：前端-注入环境变量(同一份代码，在不同的环境下有不同的操作)
//需求：前端项目中，开发模式下打印语句生效,生产模式下打印语句失效
//问题：cross-env设置的只是在node.js中生效，前端代码无法访问process.env.NODE_ENV
//解决：使用webpack内置的DefinePlugin插件
if(process.env.NODE_ENV==='production'){
    console.log=function(){}
}
console.log('开发模式下好用,生产模式下失效')

//目标15：开发环境调错-source map
//问题：代码被压缩和混淆，无法正确定位源代码位置(行数和列数)
//source map: 可以准确追踪error和warning在原始代码的位置
//设置：webpack.config.js配置devtool选项（inline-source-map选项:把源码的位置信息一起打包在js文件内）
//注意：source map仅适用于开发环境,不要在生产环境使用(防止被轻易查看源码位置)
console.warning(123);//未配置时报错consolee is not defined 在js的771行，而实际源代码位置在186行

//目标16: 解析别名alias
//解析别名：配置模块如何解析，创建import引入路径的别名，来确保模块引入变得更简单
//例如：原来引入路径较长而且相对路径不安全
//解决：在webpack.config.js中配置解析别名@来代表src绝对路径（配置resolve.alias选项）
//这里的@使用解析别名，代表的是F:\前端学习\6.AJAX\3.webpack\03\src
import youAxios from '@/utils/request.js';

//目标17：webpack优化-CDN使用
//CDN定义：内容分发网络，指的是一组分布在各个地区的服务器
//作用：把静态资源文件/第三方库放在CDN网络各个服务器中，供用户就近请求获取
//好处：减轻自己服务器请求压力，就近请求物理延迟低，配套缓存策略

//需求：开发模式使用本地第三方库，生产模式下使用CDN加载引入
//1.在html中引入第三方库的CDN地址并用模板语法判断
//2.配置webpack.config.js中externals外部扩展选项(防止某些import的包被打包)
//3.两种模式下分别打包观察效果

//目标18：webpack多页面打包
//单页面：单个html文件，切换DOM的方式实现不同业务逻辑展示，后续vue/react会学到
//多页面：多个html文件，切换页面实现不同业务逻辑展示

//需求：把黑马头条-数据管理平台-内容页面一起引入打包使用
//1.准备源码(html,css,js)放入相应位置,并改用模块化语法导出
//2.下载form-serialize包并导入到核心代码中使用
//3.配置webpack.config.js多入口和多页面的设置

//目标19：webpack进行发布文章页面的打包

//目标20：优化-分割公共代码
//需求：把2个以上页面引用的公共代码提取
//1.配置webpack.config.js的splitChunks分割功能
//2.打包观察效果
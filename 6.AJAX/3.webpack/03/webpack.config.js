const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const webpack = require('webpack')
// module.exports = {
//   //设置打包模式(development 开发模式-使用相关内置优化)
//   mode:'development',
//   entry: path.resolve(__dirname, 'src/login/03.js'),
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: './login/03.js',
//     clean:true //生成打包后内容之前，清空输出目录
//   },
//   devServer: {
//     port:8088,
//     static:'./publish'//默认是public文件下，可以自动修改项目的根目录
//   },
//   //插件（给webpack提供更多功能）
//   plugins:[
//     new HtmlWebpackPlugin({
//       template:path.resolve(__dirname,'publish/login.html'),//模块文件,以这个文件生成html网页
//       filename:path.resolve(__dirname,'dist/login/login.html')//输出文件
//     }),
//     new MiniCssExtractPlugin({
//       filename:'./login/index.css'//只能传相对路径
//     }),//生成css文件
//     new webpack.DefinePlugin({
//       'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV)
//     })
//   ],
//   //加载器（让webpack识别更多模块文件内容）
//   module: {
//     rules: [
//       {
//         test: /\.css$/i,
//         //从后往前执行，先css-loader再style-loader
//         // use: ["style-loader", "css-loader"],
//         use: [process.env.NODE_ENV==='development'?'style-loader':MiniCssExtractPlugin.loader, "css-loader"],
//       },
//       //打包less代码配置
//       {
//         test: /\.less$/i,
//         use: [
//           // compiles Less to CSS
//           // 'style-loader',不能与MiniCssExtractPlugin.loader混用，所以要更改
//           process.env.NODE_ENV==='development'?'style-loader':MiniCssExtractPlugin.loader,
//           'css-loader',
//           'less-loader',
//         ],
//       },
//       //打包图片的配置
//       {
//         test:/\.(png|jgp|jpeg|gif)$/i,
//         type:'asset',
//         generator:{
//           filename:'assets/[hash][ext][query]'
//         }
//       }
//     ],
//   },
//   //优化
//   optimization: {
//     //最小化
//     minimizer: [
//       // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
//       `...`,//(我们添加了optimization这个选项，就是告诉webpack整个打包优化我们需要自己来设置，因此原本内置的压缩js代码功能就没有了，加上这一句就能保证js代码压缩功能还在或者是下载terser-webpack-plugin进行如下方式的new也可以)
//       new CssMinimizerPlugin(),
//     ],
//   },
// };

const config = {
  //设置打包模式(development 开发模式-使用相关内置优化)
  // mode:'development',
  //入口
  //entry: path.resolve(__dirname, 'src/login/index.js'),
  entry:{
    'login': path.resolve(__dirname, 'src/login/index.js'),
    'content': path.resolve(__dirname, 'src/content/index.js'),
    'publish': path.resolve(__dirname, 'src/publish/index.js'),
  },
  //出口
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './[name]/index.js',//占位符，自动匹配上面的login和content
    clean:true //生成打包后内容之前，清空输出目录
  },
  devServer: {
    port:8088,
    static:'./publish'//默认是public文件下，可以自动修改项目的根目录
  },
  //插件（给webpack提供更多功能）
  plugins:[
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'publish/login.html'),//模块文件,以这个文件生成html网页
      filename:path.resolve(__dirname,'dist/login/login.html'),//输出文件
      useCdn:process.env.NODE_ENV==='production',//生产模式下使用cdn引入的地址
      chunks:['login']//要引入哪些相关的css和js文件
    }),
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'publish/content.html'),//模块文件,以这个文件生成html网页
      filename:path.resolve(__dirname,'dist/content/index.html'),//输出文件
      useCdn:process.env.NODE_ENV==='production',//生产模式下使用cdn引入的地址
      chunks:['content']
    }),
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'publish/publish.html'),//模块文件,以这个文件生成html网页
      filename:path.resolve(__dirname,'dist/publish/index.html'),//输出文件
      useCdn:process.env.NODE_ENV==='production',//生产模式下使用cdn引入的地址
      chunks:['publish']
    }),
    new MiniCssExtractPlugin({
      filename:'./[name]/index.css'//只能传相对路径
    }),//生成css文件
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV)
    })
  ],
  //加载器（让webpack识别更多模块文件内容）
  module: {
    rules: [
      {
        test: /\.css$/i,
        //从后往前执行，先css-loader再style-loader
        // use: ["style-loader", "css-loader"],
        use: [process.env.NODE_ENV==='development'?'style-loader':MiniCssExtractPlugin.loader, "css-loader"],
      },
      //打包less代码配置
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          // 'style-loader',不能与MiniCssExtractPlugin.loader混用，所以要更改
          process.env.NODE_ENV==='development'?'style-loader':MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      //打包图片的配置
      {
        test:/\.(png|jgp|jpeg|gif)$/i,
        type:'asset',
        generator:{
          filename:'assets/[hash][ext][query]'
        }
      }
    ],
  },
  //优化
  optimization: {
    //最小化
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      `...`,//(我们添加了optimization这个选项，就是告诉webpack整个打包优化我们需要自己来设置，因此原本内置的压缩js代码功能就没有了，加上这一句就能保证js代码压缩功能还在或者是下载terser-webpack-plugin进行如下方式的new也可以)
      new CssMinimizerPlugin(),
    ],
    //代码分割
    splitChunks: {
      chunks: 'all', // 所有模块动态非动态移入的都分割分析
      cacheGroups: { // 分隔组
        commons: { // 抽取公共模块
          minSize: 0, // 抽取的chunk最小大小字节
          minChunks: 2, // 最小引用数
          reuseExistingChunk: true, // 当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用
          name(module, chunks, cacheGroupKey) { // 分离出模块文件名
            const allChunksNames = chunks.map((item) => item.name).join('~') // 模块名1~模块名2
            return `./js/${allChunksNames}` // 输出到 dist 目录下位置
          }
        }
      }
    }
  },
  //解析别名
  resolve:{
    //别名
    alias:{
      '@':path.resolve(__dirname,'src')
    }
  }
};

//在开发环境下使用sourcemap选项
if(process.env.NODE_ENV==='development'){
  config.devtool = 'inline-source-map'
}
module.exports=config;
//生产环境下使用相关配置
if(process.env.NODE_ENV==='production'){
  //外部扩展，让webpack防止import的包被打包进来
  config.externals={
    //key:import from语句后面的字符串
    //value:留在原地的全局变量(最好和cdn在全局暴露的变量一致)
    'bootstrap/dist/css/bootstrap.min.css':'bootstrap',
    'axios':'axios',
    'form-serialize':'serialize',
    '@wangeditor/editor':'wangEditor'
  }
}
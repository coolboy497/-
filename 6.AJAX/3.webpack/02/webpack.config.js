const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/02.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '02.js',
    clean:true //生成打包后内容之前，清空输出目录
  },
};
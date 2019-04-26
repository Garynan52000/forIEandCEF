/* 依赖 start */
const path = require('path');
const rules = require('./webpack.loders');
/* 依赖 end */

/* 插件 start */
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html 模板插件
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin'); // typescript 类型检查插件
/* 插件 end */

/* 常量 start */
const TEMPLATE_URL = '../public/index.html'; // html template url
/* 常量 end */

module.exports = function(MetaData){
  const {mode, outputPath, publicPath} = MetaData;
  
  return {
    mode,
    context: __dirname,
    entry: {
      index: './src/index.ts',
    },
    output: {
      path: path.resolve(__dirname, outputPath),
      filename: '[name].bundle.js',
      publicPath
    },
    module: { // loders 规则
      rules: rules(MetaData)
    },
    resolve: { // 资源引入配置
      alias: { // 路径别名
        "@": path.resolve(__dirname, 'src'),
        Assets: path.resolve(__dirname, 'src/assets')
      },
      extensions: [ '.tsx', '.ts', '.js', 'json', '*' ], // 引入资源时，依次尝试的文件后缀 （使进入资源时，路径可不带文件后缀）
      mainFiles: ['index'],
      modules: ['node_modules']
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: TEMPLATE_URL,
        filename: 'index.html'
      }),
      new ForkTsCheckerWebpackPlugin({
        tslint: MetaData.isTsLint, 
        useTypescriptIncrementalApi: true
      }),
    ],
  };
}


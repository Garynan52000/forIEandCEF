/* 依赖 start */
const path = require('path');
const rules = require('./webpack.loders');
/* 依赖 end */

/* 插件 start */
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html 模板插件
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin'); // typescript 类型检查插件
const CopyPlugin = require('copy-webpack-plugin'); // 文件复制插件
/* 插件 end */

/* 常量 start */
const TEMPLATES = { // html 模板
  index: { // 首页
    name: 'index',
		template: 'public/index.html',
		filename: 'index.html',
	} 
} 
const PUBLIC_JS_TO = 'assets/js/' // 公共 js 编译路径
/* 常量 end */

module.exports = function(MetaData){
  const {mode, isProd, outputPath, publicPath} = MetaData; // 配置元数据
  let publicJsPath = isProd? `../${PUBLIC_JS_TO}` : PUBLIC_JS_TO; // 公共 js 编译路径计算
  let commonHtmlModel = { // 公共 html 模板数据模型
    es5Shim: `<script src="${publicPath}${publicJsPath}es5-shim.min.js"></script>`,
    es5Sham: `<script src="${publicPath}${publicJsPath}es5-sham.min.js"></script>`,
    h5shiv: `<script src="${publicPath}${publicJsPath}html5shiv-printshiv.min.js"></script>`,
  }
  let indexHtmlModel = Object.assign(commonHtmlModel, {}); // 首页 html 数据模型
  
  return {
    mode, // 编译模式
    context: path.resolve(__dirname, '../'), // 项目上下文环境
    entry: { // 入口文件
      [TEMPLATES.index.name]: './src/index.ts',
    },
    output: { // 输出配置
      path: path.resolve(__dirname, outputPath),
      filename: 'js/[name].bundle.js',
      publicPath
    },
    module: { // loders 规则
      rules: rules(MetaData)
    },
    resolve: { // 资源引入配置
      alias: { // 路径别名
        "@": path.resolve(__dirname, '../src'),
        Assets: path.resolve(__dirname, '../src/assets')
      },
      extensions: [".ts", ".tsx", ".js", '*'], // 引入资源时，依次尝试的文件后缀 （使引入资源时，路径可不带文件后缀）
      mainFiles: ['index'], // 主文件名，默认情况下找哪个文件
      modules: ['node_modules'] 
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: '会员礼包',
        template: TEMPLATES.index.template,
        filename: isProd? `../${TEMPLATES.index.filename}` : TEMPLATES.index.filename,
        hash: isProd,
        model: indexHtmlModel
      }),
      new ForkTsCheckerWebpackPlugin({
        tslint: MetaData.isTsLint, 
        useTypescriptIncrementalApi: true
      }),
      new CopyPlugin([
        { from: 'public/js', to: publicJsPath },
      ])
    ],
  };
}


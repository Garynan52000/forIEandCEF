/* 依赖 start */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const packageJSON = require('../package.json');
/* 依赖 end */

/* 插件 start */
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清空输出文件夹插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css 最小化插件
const TerserJSPlugin = require('terser-webpack-plugin'); // js 编译优化插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css 编译优化插件 
/* 插件 end */

/* 常量 start */
const APP_NAME = packageJSON.name; // 项目名称
const VERSION = packageJSON.version; // 当前版本
/* 常量 end */

/* 配置数据源 start */
const MetaData = {
	mode: 'production',
	isProd: true,
	outputPath: `../dist/${APP_NAME}/${VERSION}`,
	publicPath: `/${APP_NAME}/${VERSION}`,
	isTsLint: true
}
/* 配置数据源 end */

module.exports = merge(common(MetaData), {
	optimization: { // webpack 编译优化配置
		minimizer: [
		  new TerserJSPlugin({}), 
		  new OptimizeCSSAssetsPlugin({})
		],
	},
	plugins: [
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: ['../dist/*'],
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css'
		  })
	]
});
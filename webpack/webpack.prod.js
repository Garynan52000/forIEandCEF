/* 依赖 start */
const path = require('path');
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
	outputPath: `../dist/${APP_NAME}/${VERSION}/`,
	publicPath: `/${APP_NAME}/${VERSION}/`,
	isTsLint: true,
	isCDN: false,
	isSimming: false
}
/* 配置数据源 end */

/**
 * 获取当前编译模块的名字
 * @param {*} m 模块
 */
function recursiveIssuer(m) {
	if (m.issuer) {
	  return recursiveIssuer(m.issuer);
	} else if (m.name) {
	  return m.name;
	} else {
	  return false;
	}
}

module.exports = merge(common(MetaData), {
	optimization: { // webpack 编译优化配置
		splitChunks: {
			cacheGroups: {
				indexStyles: {
					name: 'index',
					test: (m, c, entry = 'index') =>
						m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
					chunks: 'all',
					enforce: true,
				},
			},
		},
		minimizer: [
		  new TerserJSPlugin({
				terserOptions: {
					ie8: true
				}
			}), 
		  new OptimizeCSSAssetsPlugin({})
		],
	},
	plugins: [
		new CleanWebpackPlugin({
			verbose: true,
			cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist/*')],
		}),
		new MiniCssExtractPlugin({ // 为每个包含CSS的JS文件创建一个CSS文件,且最小化 css
			filename: 'css/[name].css',
			chunkFilename: 'css/[id].css'
		})
	]
});
/* 依赖 start */
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
/* 依赖 end */

/* 插件 start */
// const TerserJSPlugin = require('terser-webpack-plugin'); // js 编译优化插件
/* 插件 end */

/* 配置数据源 start */
const MetaData = {
	devPort: 80,
	host: 'dev.yy.com',
	mode: 'development',
	isProd: false,
	outputPath: `../dist/`,
	publicPath: `/`,
	isTsLint: true,
	isCDN: false,
	dns: '',
	isSimming: false
}
/* 配置数据源 end */

module.exports = merge(common(MetaData), {
	devtool: 'inline-source-map',
	devServer: {
		port: MetaData.devPort,
		contentBase: MetaData.outputPath,
		publicPath: MetaData.publicPath,
		host: MetaData.host
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		// new TerserJSPlugin({
		// 	terserOptions: {
		// 		ie8: true
		// 	}
		// })
	]
});
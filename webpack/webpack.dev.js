/* 依赖 start */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
/* 依赖 end */

/* 配置数据源 start */
const MetaData = {
	devPort: 3000,
	mode: 'development',
	isProd: false,
	outputPath: `../dist`,
	publicPath: `/`,
	isTsLint: true
}
/* 配置数据源 end */

module.exports = merge(common(MetaData), {
	devtool: 'inline-source-map',
	devServer: {
		port: MetaData.devPort,
		contentBase: MetaData.outputPath,
		publicPath: MetaData.publicPath
  	},
	optimization: {
		usedExports: true
	}
});
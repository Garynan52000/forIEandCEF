const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const MetaData = {
    outputPath: `../dist`,
    publicPath: `/`
}

module.exports = merge(common(MetaData), {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: MetaData.outputPath
  },
  optimization: {
    usedExports: true
  }
});
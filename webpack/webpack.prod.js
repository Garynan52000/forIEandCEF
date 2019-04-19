const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const APP_NAME = 'nantest';
const VERSION = 'V1_0_4';

const MetaData = {
    version: VERSION,
    outputPath: `../dist/${APP_NAME}/${VERSION}`,
    publicPath: `/${APP_NAME}/${VERSION}`
}

module.exports = merge(common(MetaData), {
  mode: 'production',
});
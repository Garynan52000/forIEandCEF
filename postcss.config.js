
  module.exports = ({ env }) => {
    const IS_PRO_MODE = env === 'production';
        
    return {
      parser: 'sugarss',
      syntax: 'postcss-scss',
      stringifier: 'midas',
      map: true,
      plugins: [
        IS_PRO_MODE ? require('autoprefixer') : false
      ]
    }
  }
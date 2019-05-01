
module.exports = ({ isProd }) => {
	return {
		stringifier: 'midas',
		map: isProd ? false : 'inline',
		plugins: {
			'postcss-preset-env': isProd ? {} : false,
			'postcss-assets': isProd ? {} : false,
			'postcss-sprites': isProd ? {} : false,
			'stylelint': isProd ? {} : false,
			'cssnano': isProd ? {} : false,
		}
	}
}
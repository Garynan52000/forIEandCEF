module.exports = ({ file, options }) => {
	const { isProd } = options;

	return {
		syntax: 'postcss-scss',
		parser: 'postcss-scss',
		// stringifier: 'midas',
		map: isProd ? false : 'inline',
		plugins: [
			isProd ? require('stylelint')({}) : null,
			require('postcss-preset-env')({}),
			isProd ? require('postcss-assets')({}) : null,
			isProd ? require('postcss-sprites')({}) : null,
			isProd ? require('cssnano')({}) : null,
		]
	}
}
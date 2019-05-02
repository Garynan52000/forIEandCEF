module.exports = ({ file, options }) => {
	const { isProd } = options;

	return {
		syntax: 'postcss-scss',
		parser: 'postcss-scss',
		// stringifier: 'midas',
		map: isProd ? false : 'inline',
		plugins: [
			// isProd ? require('postcss-import')() : null,
			// isProd ? require('stylelint')({}) : null,
			isProd ? require('postcss-preset-env')({}) : null,
			isProd ? require('postcss-assets')({}) : null,
			isProd ? require('postcss-sprites')({}) : null,
			isProd ? require('cssnano')({}) : null,
		]
	}
}
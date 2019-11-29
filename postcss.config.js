module.exports = {
	plugins: {
		'postcss-import': {},
		'postcss-url': {},
		'postcss-aspect-ratio-mini': {},
		'postcss-write-svg': { utf8: false },
		'postcss-cssnext': {},
		'postcss-px-to-viewport': {
			unitToConvert: 'px',
			viewportWidth: 750,
			unitPrecision: 3,
			viewportUnit: 'vw',
			selectorBlackList: ['.ignore', '.hairlines'],
			minPixelValue: 1,
			mediaQuery: false,
			exclude: [/node_modules/]
		},
		'postcss-viewport-units': {},
		'cssnano': {
			"cssnano-preset-advanced": {
				zindex: false,
				autoprefixer: false
			}
		}
	}
}

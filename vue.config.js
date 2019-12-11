module.exports = {
	publicPath: './', // 根域上下文目录
  devServer: {
    // disableHostCheck: true,
    // host: '0.0.0.0',
    proxy: {
      '/ZHYD': {
				target: 'http://fx.hekouxin.com:60',
				changeOrigin: true,
      }
    }
	},
	configureWebpack: {
    externals: { // 这些通过CDN引入，不用打包到vendors
      vue: 'Vue',
			'vue-router': 'VueRouter',
			vuex: 'Vuex',
			axios:'axios'
    }
  }
}

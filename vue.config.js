module.exports = {
  devServer: {
    // disableHostCheck: true,
    // host: '0.0.0.0',
    proxy: {
      '/ZHYD': {
				target: 'http://fx.hekouxin.com:60',
				changeOrigin: true,
      }
    }
  }
}

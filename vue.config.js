module.exports = {
	publicPath: './', // 根域上下文目录
  devServer: {
    proxy: {
      '/ZHYD': {
				target: 'http://fx.hekouxin.com:60',
				changeOrigin: true,
      }
    }
	}
}

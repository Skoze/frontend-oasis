const option = {
  target: 'http://106.13.69.146:8080',
  changeOrigin: true,
};
module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    port: 80,
    proxy: {
      '/administrator': option,
      '/user': option,
    },
  },
  publicPath: process.env.BASE_URL || '/',
};

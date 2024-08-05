const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/vk',
    createProxyMiddleware({
      target: 'https://api.vk.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api/vk': ''
      },
    })
  );
};
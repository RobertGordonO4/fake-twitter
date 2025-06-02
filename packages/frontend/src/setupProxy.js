const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // if your NestJS API is prefixed with /api
    createProxyMiddleware({
      target: 'http://localhost:3001', // Your NestJS backend
      changeOrigin: true,
    })
  );
};
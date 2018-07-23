const jsonMiddleware = require('express').json();

module.exports = (request, response, next) => {
  const contentLength = request.headers['content-length'] || 0;
  if (request.method === 'POST' && contentLength > 0) {
    return jsonMiddleware(request, response, next);
  };
  next();
};

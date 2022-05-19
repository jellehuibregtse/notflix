import { INestApplication } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { useLogger } from './logger.proxy';

function useHttpProxy(target: string) {
  return createProxyMiddleware({
    target: target,
    changeOrigin: true,
    logLevel: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    logProvider: useLogger,
  });
}

export const registerProxyGateway = (app: INestApplication) => {
  const proxies: { [key: string]: string } = {
    // Movie service api proxy
    '/api/movies': `http://${process.env.MOVIE_SERVICE_HOST}:${process.env.MOVIE_SERVICE_PORT}`,
    '/api/genres': `http://${process.env.MOVIE_SERVICE_HOST}:${process.env.MOVIE_SERVICE_PORT}`,
    '/api/docs/movie-service': `http://${process.env.MOVIE_SERVICE_HOST}:${process.env.MOVIE_SERVICE_PORT}`,

    // User service api proxy
    '/api/auth': `http://${process.env.USER_SERVICE_HOST}:${process.env.USER_SERVICE_PORT}`,
    '/api/users': `http://${process.env.USER_SERVICE_HOST}:${process.env.USER_SERVICE_PORT}`,
    '/api/docs/user-service': `http://${process.env.USER_SERVICE_HOST}:${process.env.USER_SERVICE_PORT}`,

    // Web application
    '*': `http://${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}`,
  };

  for (const [path, target] of Object.entries(proxies)) {
    app.use(path, useHttpProxy(target));
  }
};

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
    // Movie service API proxy
    '/api/movies': `http://${process.env.MOVIE_SERVICE_HOST}:${process.env.MOVIE_SERVICE_PORT}`,
    '/docs/movies': `http://${process.env.MOVIE_SERVICE_HOST}:${process.env.MOVIE_SERVICE_PORT}`,

    // Account service API proxy
    '/api/account': `http://${process.env.ACCOUNT_SERVICE_HOST}:${process.env.ACCOUNT_SERVICE_PORT}`,
    '/docs/account': `http://${process.env.ACCOUNT_SERVICE_HOST}:${process.env.ACCOUNT_SERVICE_PORT}`,

    // User service API proxy
    '/api/auth': `http://${process.env.AUTH_SERVICE_HOST}:${process.env.AUTH_SERVICE_PORT}`,
    '/api/users': `http://${process.env.AUTH_SERVICE_HOST}:${process.env.AUTH_SERVICE_PORT}`,
    '/docs/auth': `http://${process.env.AUTH_SERVICE_HOST}:${process.env.AUTH_SERVICE_PORT}`,

    // Web application
    '*': `http://${process.env.WEB_HOST}:${process.env.WEB_PORT}`,
  };

  for (const [path, target] of Object.entries(proxies)) {
    app.use(path, useHttpProxy(target));
  }
};

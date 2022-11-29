import koa from 'koa';
import instances from './instances';
import { mapMiddlewares, mapRoutes, start, getConfiguration } from './server';
import { AppContext, AppState, AppServices, AppConfig } from './types';

(async (services: AppServices) => {
    const config: AppConfig = getConfiguration();
    const app = new koa<AppState, AppContext>();
    mapMiddlewares(app, services, config);
    mapRoutes(app, services);
    start(app, services, config.port);
})(instances);
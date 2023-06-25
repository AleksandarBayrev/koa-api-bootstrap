import koa from 'koa';
import instances, { Services } from './instances';
import { mapMiddlewares, mapRoutes, start, getConfiguration } from './server';
import { AppContext, AppState, AppConfig } from './types';

(async (services: Services) => {
    const config: AppConfig = getConfiguration();
    const app = new koa<AppState, AppContext>();
    mapMiddlewares(app, services, config);
    mapRoutes(app, services);
    start(app, services, config.port);
})(instances);
import koa from 'koa';
import instances, { Services } from './instances';
import { mapMiddlewares, mapRoutes, start, getConfiguration } from './server';
import { AppContext, AppState, AppConfig } from './types';
import { configureInstances } from './configureInstances';

(async (services: Services) => {
    configureInstances(services);
    const config: AppConfig = getConfiguration();
    const app = new koa<AppState, AppContext>();
    mapMiddlewares(app, services, config);
    mapRoutes(app, services);
    start(app, services, config.port);
})(instances);
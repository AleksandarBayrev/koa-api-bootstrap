import koa from 'koa';
import { mapMiddlewares, mapRoutes, start, getConfiguration } from './server';
import { AppContext, AppState, AppConfig } from './types';
import { configureInstances } from './configureInstances';
import { DependencyInjection } from './base';

DependencyInjection.setupInstance(console.log, false);

(async (DI: DependencyInjection) => {
    configureInstances(DI);
    const config: AppConfig = getConfiguration();
    const app = new koa<AppState, AppContext>();
    mapMiddlewares(app, DI, config);
    mapRoutes(app, DI);
    start(app, DI, config.port);
})(DependencyInjection.getInstance());
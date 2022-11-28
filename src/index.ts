import koa from 'koa';
import { PORT } from './config';
import instances from './instances';
import { mapMiddlewares, mapRoutes, start } from './server';
import { AppContext, AppState, AppServices } from './types';

(async (services: AppServices) => {
    const app = new koa<AppState, AppContext>();
    mapMiddlewares(app, services);
    mapRoutes(app, services);
    start(app, services, PORT);
})(instances);
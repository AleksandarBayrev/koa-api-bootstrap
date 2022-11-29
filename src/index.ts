import koa from 'koa';
import fs from 'fs';
import path from 'path';
import instances from './instances';
import { mapMiddlewares, mapRoutes, start } from './server';
import { AppContext, AppState, AppServices, AppConfig } from './types';

(async (services: AppServices) => {
    const config: AppConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')).toString());
    const app = new koa<AppState, AppContext>();
    mapMiddlewares(app, services);
    mapRoutes(app, services);
    start(app, services, config.port);
})(instances);
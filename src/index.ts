import koa from 'koa';
import { mapMiddlewares, mapRoutes, start, getConfiguration } from './server';
import { AppContext, AppState, AppConfig, ILogger } from './types';
import { configureInstances } from './configureInstances';
import { DependencyInjection } from './base';
import process from 'process';

DependencyInjection.setupInstance(console.log, false);

(async (DI: DependencyInjection) => {
    configureInstances(DI);
    const logger: ILogger = DI.getService<ILogger>("ILogger");
    const config: AppConfig = await getConfiguration();
    if (config.logTotalHeapOnStartup) {
        logger.logObject(process.memoryUsage());
    }
    const app = new koa<AppState, AppContext>();
    mapMiddlewares(app, DI, config);
    mapRoutes(app, DI);
    start(app, DI, config.port);
})(DependencyInjection.getInstance());
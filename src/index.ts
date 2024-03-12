import koa from 'koa';
import { mapMiddlewares, mapRoutes, start, getConfiguration } from './server';
import { AppContext, AppState, AppConfig, ILogger } from './types';
import { configureInstances } from './configureInstances';
import { DependencyInjection } from './base';
import { Helpers } from './Helpers';

DependencyInjection.setupInstance(console.log, false);

(async (DI: DependencyInjection) => {
    const config: AppConfig = await getConfiguration();
    await configureInstances(DI, config);
    const logger: ILogger = DI.getService<ILogger>("ILogger");
    Helpers.logFlags(config, logger);
    logger.appInfo(`Application minimum log level => ${Helpers.getLogLevel(config.minLogLevel)}`);
    const app = new koa<AppState, AppContext>();
    mapMiddlewares(app, DI);
    mapRoutes(app, DI);
    start(app, DI, config.port);
})(DependencyInjection.getInstance());
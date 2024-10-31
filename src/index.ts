import koa from 'koa';
import { mapMiddlewares, mapRoutes, start, getConfiguration } from '@app-server';
import { AppContext, AppState, AppConfig, ILogger } from '@app-types';
import { configureInstances } from '@app-root/configureInstances';
import { DependencyInjection } from '@app-base';
import { Helpers } from '@app-helpers';

DependencyInjection.setupInstance(console.log, false);

(async (DI: DependencyInjection) => {
    try {
        const config: AppConfig = await getConfiguration();
        await configureInstances(DI, config);
        const logger: ILogger = DI.getService<ILogger>("ILogger");
        Helpers.logFlags(config, logger);
        logger.appInfo(`Application minimum log level => ${Helpers.getLogLevel(config.minLogLevel)}`);
        const app = new koa<AppState, AppContext>();
        mapMiddlewares(app, DI);
        mapRoutes(app, DI);
        start(app, DI, config.port);
    } catch (err: any) {
        console.log(err);
    }
})(DependencyInjection.getInstance());
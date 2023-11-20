import koa from 'koa';
import fs from 'fs';
import path from 'path';
import staticMiddleware from 'koa-static';
import { AppState, AppContext, ILogger, AppConfig } from '../../../types';

export const staticFilesMiddleware = (app: koa<AppState, AppContext>, logger: ILogger, configuration: AppConfig) => {
    if (configuration.staticFileServing && configuration.staticFileServing.enabled) {
        logger.info('Adding static file serving');
        const pathToServe = path.join(__dirname, configuration.staticFileServing.path);
        if (!fs.existsSync(pathToServe)) {
            fs.mkdirSync(pathToServe);
        }
        app.use(staticMiddleware(pathToServe));
    }
}
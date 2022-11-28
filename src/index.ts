import koa from 'koa';
import { PORT } from './config';
import instances from './instances';
import { mapMiddlewares, mapRoutes } from './server';
import { AppContext, AppState, AppServices } from './types';

(async (services: AppServices) => {
    const app = new koa<AppState, AppContext>();
    mapMiddlewares(app, services);
    mapRoutes(app, services);
    app.listen(PORT, async () => {
        await services.logger.log(`Server started on port ${PORT}`);
    });
})(instances);
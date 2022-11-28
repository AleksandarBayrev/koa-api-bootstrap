import koa from 'koa';
import { AppContext, AppServices, AppState, ILogger } from '../types';

export const start = (app: koa<AppState, AppContext>, services: AppServices, port: number) => {
    app.listen(port, async () => {
        await services.logger.log(`Server started on port ${port}`);
    });
}
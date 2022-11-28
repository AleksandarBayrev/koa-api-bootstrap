import koa from 'koa';
import { AppContext, AppState, ILogger } from '../types';

export const start = (app: koa<AppState, AppContext>, logger: ILogger, port: number) => {
    app.listen(port, async () => {
        await logger.log(`Server started on port ${port}`);
    });
}
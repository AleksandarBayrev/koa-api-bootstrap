import koa from 'koa';
import { AppContext, AppState, ILogger } from '../types';
import { DependencyInjection } from '../base';

export const start = (app: koa<AppState, AppContext>, DI: DependencyInjection, port: number) => {
    app.listen(port, async () => {
        await DI.getService<ILogger>("ILogger").appInfo(`Server started on port ${port}`);
    });
}
import koa from 'koa';
import { AppContext, AppState, ILogger } from '../types';
import { Services } from '../instances';

export const start = (app: koa<AppState, AppContext>, services: Services, port: number) => {
    app.listen(port, async () => {
        await services.get<ILogger>("logger").log(`Server started on port ${port}`);
    });
}
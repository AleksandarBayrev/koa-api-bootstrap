import koa from 'koa';
import Router from 'koa-router';
import { AppContext, AppState, IRequestMediator } from '@app-types';
import { DependencyInjection } from '@app-base';
import { ErrorResponse, IndexRoutePatchResponse } from '@app-types/responses';

export const indexRoutePatchHandlerName = "indexRoutePatch";

export const indexRoutePatch = (router: Router<AppState, AppContext>, DI: DependencyInjection) => {
    router.patch('/', async (context: koa.ParameterizedContext<AppState, AppContext, IndexRoutePatchResponse | ErrorResponse>, next) => {
        return await DI.getService<IRequestMediator>("IRequestMediator").sendRequest(indexRoutePatchHandlerName, DI, context, next);
    });
}
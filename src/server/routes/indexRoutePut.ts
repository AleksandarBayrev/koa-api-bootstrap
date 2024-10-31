import koa from 'koa';
import Router from 'koa-router';
import { AppContext, AppState, IRequestMediator } from '@app-types';
import { DependencyInjection } from '@app-base';
import { ErrorResponse, IndexRoutePostResponse } from '@app-types/responses';

export const indexRoutePutHandlerName = "indexRoutePut";

export const indexRoutePut = (router: Router<AppState, AppContext>, DI: DependencyInjection) => {
    router.put('/', async (context: koa.ParameterizedContext<AppState, AppContext, IndexRoutePostResponse | ErrorResponse>, next) => {
        return await DI.getService<IRequestMediator>("IRequestMediator").sendRequest(indexRoutePutHandlerName, DI, context, next);
    });
}
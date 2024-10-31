import koa from 'koa';
import Router from 'koa-router';
import { AppContext, AppState, IRequestMediator } from '@app-types';
import { DependencyInjection } from '@app-base';
import { IndexRoutePostResponse, ErrorResponse } from '@app-types/responses';

export const indexRoutePostHandlerName = "indexRoutePost";

export const indexRoutePost = (router: Router<AppState, AppContext>, DI: DependencyInjection) => {
    router.post('/', async (context: koa.ParameterizedContext<AppState, AppContext, IndexRoutePostResponse | ErrorResponse>, next) => {
        return await DI.getService<IRequestMediator>("IRequestMediator").sendRequest(indexRoutePostHandlerName, DI, context, next);
    });
}
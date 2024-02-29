import koa from 'koa';
import Router from 'koa-router';
import { AppContext, AppState, IRequestMediator } from '../../types';
import { DependencyInjection } from '../../base';
import { ErrorResponse, IndexRouteDeleteResponse } from '../../types/responses';

export const indexRouteDeleteHandlerName = "indexRouteDelete";

export const indexRouteDelete = (router: Router<AppState, AppContext>, DI: DependencyInjection) => {
    router.delete('/', async (context: koa.ParameterizedContext<AppState, AppContext, IndexRouteDeleteResponse | ErrorResponse>, next) => {
        return await DI.getService<IRequestMediator>("IRequestMediator").sendRequest(indexRouteDeleteHandlerName, DI, context, next);
    });
}
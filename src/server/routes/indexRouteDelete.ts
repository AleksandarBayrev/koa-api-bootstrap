import koa from 'koa';
import Router from 'koa-router';
import { AppContext, AppState, IRequestMediator } from '../../types';
import { DependencyInjection } from '../../base';

export const indexRouteDeleteHandlerName = "indexRouteDelete";

export const indexRouteDelete = (router: Router<AppState, AppContext>, DI: DependencyInjection) => {
    router.delete('/', async (context: koa.ParameterizedContext<AppState, AppContext>, next) => {
        return await DI.getService<IRequestMediator>("IRequestMediator").sendRequest(indexRouteDeleteHandlerName, DI, context, next);
    });
}
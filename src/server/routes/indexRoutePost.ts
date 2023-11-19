import koa from 'koa';
import Router from 'koa-router';
import { AppContext, AppState, IRequestMediator } from '../../types';
import { DependencyInjection } from '../../base';

export const indexRoutePostHandlerName = "indexRoutePost";

export const indexRoutePost = (router: Router, DI: DependencyInjection) => {
    router.post('/', async (context: koa.ParameterizedContext<AppState, AppContext>, next) => {
        return await DI.getService<IRequestMediator>("IRequestMediator").sendRequest(indexRoutePostHandlerName, DI, context, next);
    });
}
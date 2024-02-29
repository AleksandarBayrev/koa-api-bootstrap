import koa from 'koa';
import Router from 'koa-router';
import { AppContext, AppState, IRequestMediator } from '../../types';
import { DependencyInjection } from '../../base';

export const indexRouteGetHandlerName = "indexRouteGet";

export const indexRouteGet = (router: Router<AppState, AppContext>, DI: DependencyInjection) => {
    router.get('/', async (context: koa.ParameterizedContext<AppState, AppContext>, next) => {
        return await DI.getService<IRequestMediator>("IRequestMediator").sendRequest(indexRouteGetHandlerName, DI, context, next);
    });
}
import koa from 'koa';
import Router from 'koa-router';
import { AppContext, AppState, IRequestMediator } from '../../types';
import { DependencyInjection } from '../../base';
import { authorizationMiddleware } from './middlewares';

export const authorizationExampleRouteGetHandlerName = "authorizationExampleRouteGet";

export const authorizationExampleRouteGet = (router: Router<AppState, AppContext>, DI: DependencyInjection) => {
    router.get('/authorization', authorizationMiddleware, async (context: koa.ParameterizedContext<AppState, AppContext>, next) => {
        return await DI.getService<IRequestMediator>("IRequestMediator").sendRequest(authorizationExampleRouteGetHandlerName, DI, context, next);
    });
}
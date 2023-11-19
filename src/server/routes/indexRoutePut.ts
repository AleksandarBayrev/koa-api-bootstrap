import koa from 'koa';
import Router from 'koa-router';
import { AppContext, AppState, IRequestMediator } from '../../types';
import { DependencyInjection } from '../../base';

export const indexRoutePutHandlerName = "indexRoutePut";

export const indexRoutePut = (router: Router, DI: DependencyInjection) => {
    router.put('/', async (context: koa.ParameterizedContext<AppState, AppContext>, next) => {
        return await DI.getService<IRequestMediator>("IRequestMediator").sendRequest(indexRoutePutHandlerName, DI, context, next);
    });
}
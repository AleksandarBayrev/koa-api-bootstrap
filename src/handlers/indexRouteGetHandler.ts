import koa from 'koa';
import { DependencyInjection } from '../base';
import { AppContext, RequestMediatorHandler } from '../types';
import { contentTypes } from '../constants';

export const indexRouteGetHandler: RequestMediatorHandler = async (DI: DependencyInjection, context: AppContext, next: koa.Next) => {
    context.set('Content-Type', contentTypes.json);
    context.body = {
        message: 'Hello, World! This is the GET route.'
    };
}
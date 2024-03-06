import koa from 'koa';
import { DependencyInjection } from '../base';
import { AppContext, AppState, RequestMediatorHandler } from '../types';
import { contentTypes } from '../constants';
import { ErrorResponse, IndexRouteGetResponse } from '../types/responses';

export const indexRouteGetHandler: RequestMediatorHandler = async (
    DI: DependencyInjection,
    context: koa.ParameterizedContext<AppState, AppContext, IndexRouteGetResponse | ErrorResponse>,
    next: koa.Next
) => {
    context.set('Content-Type', contentTypes.json);
    context.body = {
        message: 'Hello, World! This is the GET route.'
    };
}
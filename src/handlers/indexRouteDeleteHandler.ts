import koa from 'koa';
import { DependencyInjection } from '@app-base';
import { AppContext, AppState, RequestMediatorHandler } from '@app-types';
import { contentTypes } from '@app-constants';
import { ErrorResponse, IndexRouteDeleteResponse } from '@app-types/responses';

export const indexRouteDeleteHandler: RequestMediatorHandler = async (
    DI: DependencyInjection,
    context: koa.ParameterizedContext<AppState, AppContext, IndexRouteDeleteResponse | ErrorResponse>,
    next: koa.Next
) => {
    context.set('Content-Type', contentTypes.json);
    context.body = {
        message: 'Hello, World! This is the DELETE route.',
        requestBody: context.request.body
    };
}
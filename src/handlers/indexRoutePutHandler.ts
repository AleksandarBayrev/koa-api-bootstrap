import koa from 'koa';
import { DependencyInjection } from '@app-base';
import { AppContext, AppState, RequestMediatorHandler } from '@app-types';
import { contentTypes } from '@app-constants';
import { ErrorResponse, IndexRoutePutResponse } from '@app-types/responses';

export const indexRoutePutHandler: RequestMediatorHandler = async (
    DI: DependencyInjection,
    context: koa.ParameterizedContext<AppState, AppContext, IndexRoutePutResponse | ErrorResponse>,
    next: koa.Next
) => {
    context.set('Content-Type', contentTypes.json);
    context.body = {
        message: 'Hello, World! This is the PUT route.',
        requestBody: context.request.body
    };
}
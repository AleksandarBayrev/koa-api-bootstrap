import koa from 'koa';
import { DependencyInjection } from '@app-base';
import { AppContext, AppState, RequestMediatorHandler } from '@app-types';
import { contentTypes } from '@app-constants';
import { ErrorResponse, IndexRoutePatchResponse } from '@app-types/responses';

export const indexRoutePatchHandler: RequestMediatorHandler = async (
    DI: DependencyInjection,
    context: koa.ParameterizedContext<AppState, AppContext, IndexRoutePatchResponse | ErrorResponse>,
    next: koa.Next
) => {
    context.set('Content-Type', contentTypes.json);
    context.body = {
        message: 'Hello, World! This is the PATCH route.',
        requestBody: context.request.body
    };
}
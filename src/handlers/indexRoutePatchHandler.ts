import koa from 'koa';
import { DependencyInjection } from '../base';
import { AppContext, AppState, RequestMediatorHandler } from '../types';
import { contentTypes } from '../constants';
import { ErrorResponse, IndexRoutePatchResponse } from '../types/responses';

export const indexRoutePatchHandler: RequestMediatorHandler = async (
    DI: DependencyInjection,
    context: koa.ParameterizedContext<AppState, AppContext, IndexRoutePatchResponse | ErrorResponse>,
    next: koa.Next
) => {
    context.set('Content-Type', contentTypes.json);
    context.body = {
        message: 'Hello, World! This is the PATCH route.'
    };
}
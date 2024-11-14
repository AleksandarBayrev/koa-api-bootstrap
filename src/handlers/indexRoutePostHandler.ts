import koa from 'koa';
import { v4 } from 'uuid';
import { DependencyInjection } from '@app-base';
import { AppContext, AppState, IWorkerProcessor, IWorkerStorage, RequestMediatorHandler } from '@app-types';
import { contentTypes } from '@app-constants';
import { ErrorResponse, IndexRoutePostResponse } from '@app-types/responses';
import { IndexRoutePostRequest } from '@app-types/requests';

const buildRequest = (context: koa.ParameterizedContext<AppState, AppContext, IndexRoutePostResponse | ErrorResponse>) => {
    const {text} = <IndexRoutePostRequest>context.request.body;
    return {
        action: 'add',
        data: { id: v4(), text }
    };
}

export const indexRoutePostHandler: RequestMediatorHandler = async (
    DI: DependencyInjection,
    context: koa.ParameterizedContext<AppState, AppContext, IndexRoutePostResponse | ErrorResponse>,
    next: koa.Next
) => {
    await await DI.getService<IWorkerProcessor>("IWorkerProcessor").processMessage<{action: string; data: {id: string; text: string;}}, string[]>("Test", buildRequest(context));
    context.set('Content-Type', contentTypes.json);
    context.body = {
        message: 'Hello, World! This is the POST route.',
        requestBody: context.request.body
    };
}
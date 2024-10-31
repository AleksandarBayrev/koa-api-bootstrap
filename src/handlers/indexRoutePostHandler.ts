import koa from 'koa';
import { v4 } from 'uuid';
import { DependencyInjection } from '@app-base';
import { AppContext, AppState, IWorkerStorage, RequestMediatorHandler } from '@app-types';
import { contentTypes } from '@app-constants';
import { ErrorResponse, IndexRoutePostResponse } from '@app-types/responses';
import { IndexRoutePostRequest } from '@app-types/requests';

const addData = (DI: DependencyInjection, text: string) => {
    const worker = DI.getService<IWorkerStorage>("IWorkerStorage").getWorker("Test");
    worker.postMessage({action: "add", data: {id: v4(), text}});
    return new Promise<string[]>((res, rej) => {
        worker.on("message", (data) => {
            res(data);
        });
    });
}

export const indexRoutePostHandler: RequestMediatorHandler = async (
    DI: DependencyInjection,
    context: koa.ParameterizedContext<AppState, AppContext, IndexRoutePostResponse | ErrorResponse>,
    next: koa.Next
) => {
    const request = context.request.body as IndexRoutePostRequest;
    await addData(DI, request.text);
    context.set('Content-Type', contentTypes.json);
    context.body = {
        message: 'Hello, World! This is the POST route.',
        requestBody: context.request.body
    };
}
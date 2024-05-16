import koa from 'koa';
import { DependencyInjection } from '../base';
import { AppContext, AppState, IWorkerStorage, RequestMediatorHandler } from '../types';
import { contentTypes } from '../constants';
import { ErrorResponse, IndexRoutePostResponse } from '../types/responses';
import { IndexRoutePostRequest } from '../types/requests';
import { v4 } from 'uuid';

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
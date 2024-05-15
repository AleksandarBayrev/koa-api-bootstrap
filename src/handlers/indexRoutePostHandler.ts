import koa from 'koa';
import { DependencyInjection } from '../base';
import { AppContext, AppState, IWorkerStorage, RequestMediatorHandler } from '../types';
import { contentTypes } from '../constants';
import { ErrorResponse, IndexRoutePostResponse } from '../types/responses';

const addData = (DI: DependencyInjection) => {
    const worker = DI.getService<IWorkerStorage>("IWorkerStorage").getWorker("Test");
    worker.postMessage({action: "add", data: "1"});
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
    await addData(DI);
    context.set('Content-Type', contentTypes.json);
    context.body = {
        message: 'Hello, World! This is the POST route.',
        requestBody: context.request.body
    };
}
import koa from 'koa';
import { DependencyInjection } from '../base';
import { AppContext, AppState, IWorkerStorage, RequestMediatorHandler } from '../types';
import { contentTypes } from '../constants';
import { ErrorResponse, IndexRouteGetResponse } from '../types/responses';

const getData = (DI: DependencyInjection) => {
    const worker = DI.getService<IWorkerStorage>("IWorkerStorage").getWorker("Test");
    worker.postMessage({action: "get"});
    return new Promise<string[]>((res, rej) => {
        worker.on("message", (data) => {
            res(data);
        });
    });
}

export const indexRouteGetHandler: RequestMediatorHandler = async (
    DI: DependencyInjection,
    context: koa.ParameterizedContext<AppState, AppContext, IndexRouteGetResponse | ErrorResponse>,
    next: koa.Next
) => {
    context.set('Content-Type', contentTypes.json);
    const resultData = await getData(DI);
    const response: IndexRouteGetResponse = {
        message: 'Hello, World! This is the GET route.',
        dataSize: resultData.length,
    };
    if (!context.request.query["countOnly"]) {
        response.data = resultData;
    }
    context.body = response;
}
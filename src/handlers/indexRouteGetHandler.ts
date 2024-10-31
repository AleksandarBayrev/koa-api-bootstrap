import koa from 'koa';
import { DependencyInjection } from '@app-base';
import { AppContext, AppState, IWorkerStorage, RequestMediatorHandler } from '@app-types';
import { contentTypes } from '@app-constants';
import { ErrorResponse, IndexRouteGetResponse } from '@app-types/responses';

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
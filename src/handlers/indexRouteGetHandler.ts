import koa from 'koa';
import { DependencyInjection } from '@app-base';
import { AppContext, AppState, IWorkerProcessor, IWorkerStorage, RequestMediatorHandler } from '@app-types';
import { contentTypes } from '@app-constants';
import { ErrorResponse, IndexRouteGetResponse } from '@app-types/responses';
import { DataToStore } from '@app-root/workers/exampleWorker/types';

const buildRequest = (context: koa.ParameterizedContext<AppState, AppContext, IndexRouteGetResponse<DataToStore[]> | ErrorResponse>) => {
    const id = <string | undefined>context.request.query["id"];
    return {
        action: id ? 'get' : 'getAll',
        id
    };
}

export const indexRouteGetHandler: RequestMediatorHandler = async (
    DI: DependencyInjection,
    context: koa.ParameterizedContext<AppState, AppContext, IndexRouteGetResponse<DataToStore[]> | ErrorResponse>,
    next: koa.Next
) => {
    context.set('Content-Type', contentTypes.json);
    const resultData = await DI.getService<IWorkerProcessor>("IWorkerProcessor").processMessage<{action: string, id: string | undefined}, DataToStore[]>("Test", buildRequest(context));
    const response: IndexRouteGetResponse<DataToStore[]> = {
        message: 'Hello, World! This is the GET route.',
        dataSize: resultData.length,
    };
    if (!context.request.query["countOnly"]) {
        response.data = resultData;
    }
    context.body = response;
}
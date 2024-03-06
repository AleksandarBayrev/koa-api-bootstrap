import koa from 'koa';
import { DependencyInjection } from '../base';
import { AppContext, AppState, HealthCheckStatus, RequestMediatorHandler } from '../types';
import { contentTypes } from '../constants';
import { ErrorResponse, HealthCheckResponse } from '../types/responses';

export const healthcheckRouteGetHandler: RequestMediatorHandler = async (
    DI: DependencyInjection,
    context: koa.ParameterizedContext<AppState, AppContext, HealthCheckResponse | ErrorResponse>,
    next: koa.Next
) => {
    context.set('Content-Type', contentTypes.json);
    context.body = {
        status: HealthCheckStatus.Healthy,
        problems: []
    };
}
import koa from 'koa';
import { DependencyInjection } from '../base';
import { AppContext, AppState, HealthCheckProblem, HealthCheckStatus, RequestMediatorHandler } from '../types';
import { HealthcheckStatusHeaderKeyConstant, contentTypes } from '../constants';
import { ErrorResponse, HealthCheckResponse } from '../types/responses';

export const healthcheckRouteGetHandler: RequestMediatorHandler = async (
    DI: DependencyInjection,
    context: koa.ParameterizedContext<AppState, AppContext, HealthCheckResponse | ErrorResponse>,
    next: koa.Next
) => {
    if (context.headers[HealthcheckStatusHeaderKeyConstant] !== "true") {
        context.status = 404;
        return;
    }
    context.set('Content-Type', contentTypes.json);
    const problems: HealthCheckProblem[] = [];
    context.body = {
        status: problems.length ? HealthCheckStatus.Unhealthy : HealthCheckStatus.Healthy,
        problems
    };
}
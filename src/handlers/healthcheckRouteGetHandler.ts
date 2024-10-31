import koa from 'koa';
import { DependencyInjection } from '@app-base';
import { AppContext, AppState, HealthCheckProblem, HealthCheckStatus, RequestMediatorHandler } from '@app-types';
import { HealthcheckStatusHeaderKeyConstant, contentTypes } from '@app-constants';
import { ErrorResponse, HealthCheckResponse } from '@app-types/responses';

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
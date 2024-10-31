import koa from 'koa';
import Router from 'koa-router';
import { AppContext, AppState, IConfigurationProvider, IRequestMediator } from '@app-types';
import { DependencyInjection } from '@app-base';
import { ErrorResponse, HealthCheckResponse } from '@app-types/responses';

export const healthcheckRouteGetHandlerName = "healthcheckRouteGet";

export const healthcheckRouteGet = (router: Router<AppState, AppContext>, DI: DependencyInjection) => {
    const configurationProvider = DI.getService<IConfigurationProvider>("IConfigurationProvider");
    const configuration = configurationProvider.getConfiguration();
    if (configuration.useHealthcheck) {
        router.get('/healthcheck', async (context: koa.ParameterizedContext<AppState, AppContext, HealthCheckResponse | ErrorResponse>, next) => {
            return await DI.getService<IRequestMediator>("IRequestMediator").sendRequest(healthcheckRouteGetHandlerName, DI, context, next);
        });
    }
}
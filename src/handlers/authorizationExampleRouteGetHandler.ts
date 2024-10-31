import koa from 'koa';
import { DependencyInjection } from '@app-base';
import { AppContext, AppState, RequestMediatorHandler } from '@app-types';
import { contentTypes } from '@app-constants';

export const authorizationExampleRouteGetHandler: RequestMediatorHandler = async (
    DI: DependencyInjection,
    context: koa.ParameterizedContext<AppState, AppContext>,
    next: koa.Next
) => {
    if (!context.user) {
        context.status = 401;
        context.body = {
            message: 'Unauthorized. Please provide authorization token.'
        };
        return;
    }
    context.set('Content-Type', contentTypes.json);
    context.body = {
        message: 'Authorized'
    };
}
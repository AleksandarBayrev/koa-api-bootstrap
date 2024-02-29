import koa from 'koa';
import { DependencyInjection } from '../base';
import { AppContext, AppState, RequestMediatorHandler } from '../types';
import { contentTypes } from '../constants';
import { IncomingHttpHeaders } from 'http';

const tokenParser = (headers: IncomingHttpHeaders) => headers.authorization?.split("Bearer ")[1];

export const authorizationExampleRouteGetHandler: RequestMediatorHandler = async (DI: DependencyInjection, context: koa.ParameterizedContext<AppState, AppContext>, next: koa.Next) => {
    const token = tokenParser(context.header);
    if (context.authorizationToken !== token || !token) {
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
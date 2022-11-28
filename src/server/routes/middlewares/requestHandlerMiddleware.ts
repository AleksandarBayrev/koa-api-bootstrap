import koa from "koa";
import { contentTypes } from "../../../constants";
import { AppContext, AppState, ILogger } from "../../../types";

const errorMessages: {[key: number]: string} = Object.freeze({
    404: `Route not found`,
    400: 'Invalid request',
    500: 'Internal Server Error'
});

const mapMessageOnError = (context: koa.ParameterizedContext<AppState, AppContext, any>) => {
    return errorMessages[context.response.status] ?? errorMessages[500];
}

export const requestHandlerMiddleware = (app: koa<AppState, AppContext>, logger: ILogger) => {
    app.use(async (context: koa.ParameterizedContext<AppState, AppContext>, next) => {
        try {
            await logger.log(`Requesting ${context.request.url}`);
            await next();
            await logger.log(`Request to ${context.request.url} status = ${context.response.status}`);
            if (context.response.status >= 400) {
                context.throw(context.response.status);
            }
        } catch (err: any) {
            await logger.logObject(err);
            context.response.status = err.status || 404;
            const message = mapMessageOnError(context);
            await logger.log(`${message}, route: ${context.url}`);
            context.set('Content-Type', contentTypes.json);
            context.body = {
                route: context.url,
                message,
                status: context.response.status
            };
        }
    });
}
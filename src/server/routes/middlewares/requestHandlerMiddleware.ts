import koa from "koa";
import { contentTypes } from "../../../constants";
import { AppConfig, AppContext, AppState, ILogger } from "../../../types";
import { ErrorResponse } from "../../../types/responses";

const errorMessages: {[key: number]: string} = Object.freeze({
    404: `Route not found`,
    400: 'Invalid request',
    500: 'Internal Server Error'
});

const mapMessageOnError = (context: koa.ParameterizedContext<AppState, AppContext, any>) => {
    return errorMessages[context.response.status] ?? errorMessages[500];
}

export const requestHandlerMiddleware = (app: koa<AppState, AppContext>, appConfig: AppConfig, logger: ILogger) => {
    app.use(async (context: koa.ParameterizedContext<AppState, AppContext, {[key:string]: any} & ErrorResponse>, next) => {
        const method = `[HTTP ${context.method}]`;
        try {
            await logger.info(`${method} Requesting ${context.request.url}`);
            await next();
            await logger.info(`${method} Request to ${context.request.url} status = ${context.response.status}`);
            if (context.response.status >= 400) {
                context.throw(context.response.status, context.body.message);
            }
        } catch (err: any) {
            const castedError = err as {message: string, status: number};
            if (appConfig.developerMode) {
                await logger.errorObject(castedError);
            }
            context.response.status = castedError.status || 404;
            const message = castedError.message || mapMessageOnError(context);
            await logger.error(`${method} ${message}, route: ${context.url}`);
            context.set('Content-Type', contentTypes.json);
            context.body = {
                route: context.url,
                message,
                statusCode: context.response.status
            };
        }
    });
}
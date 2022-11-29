import koa from "koa";
import { AppConfig, AppContext, AppServices, AppState } from "../types";
import { jsonMiddleware, requestHandlerMiddleware, staticFilesMiddleware } from "./routes/middlewares";

export const mapMiddlewares = (app: koa<AppState, AppContext>, services: AppServices, configuration: AppConfig) => {
    jsonMiddleware(app);
    requestHandlerMiddleware(app, services.logger);
    staticFilesMiddleware(app, services.logger, configuration);
}
import koa from "koa";
import { AppConfig, AppContext, AppState, ILogger } from "../types";
import { jsonMiddleware, requestHandlerMiddleware, staticFilesMiddleware } from "./routes/middlewares";
import { DependencyInjection } from "../base";

export const mapMiddlewares = (app: koa<AppState, AppContext>, DI: DependencyInjection, configuration: AppConfig) => {
    jsonMiddleware(app);
    requestHandlerMiddleware(app, DI.getService<ILogger>("ILogger"));
    staticFilesMiddleware(app, DI.getService<ILogger>("ILogger"), configuration);
}
import koa from "koa";
import { AppConfig, AppContext, AppState, IConfigurationProvider, ILogger } from "../types";
import { jsonMiddleware, requestHandlerMiddleware, staticFilesMiddleware } from "./routes/middlewares";
import { DependencyInjection } from "../base";

export const mapMiddlewares = (app: koa<AppState, AppContext>, DI: DependencyInjection) => {
    const configurationProvider = DI.getService<IConfigurationProvider>("IConfigurationProvider");
    jsonMiddleware(app);
    requestHandlerMiddleware(app, configurationProvider.getConfiguration(), DI.getService<ILogger>("ILogger"));
    staticFilesMiddleware(app, DI.getService<ILogger>("ILogger"), configurationProvider.getConfiguration());
}
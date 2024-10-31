import koa from "koa";
import { AppContext, AppState, IConfigurationProvider, ILogger } from "@app-types";
import { jsonMiddleware, requestHandlerMiddleware, staticFilesMiddleware } from "@app-server/routes/middlewares";
import { DependencyInjection } from "@app-base";

export const mapMiddlewares = (app: koa<AppState, AppContext>, DI: DependencyInjection) => {
    const configurationProvider = DI.getService<IConfigurationProvider>("IConfigurationProvider");
    jsonMiddleware(app, configurationProvider.getConfiguration());
    requestHandlerMiddleware(app, configurationProvider.getConfiguration(), DI.getService<ILogger>("ILogger"));
    staticFilesMiddleware(app, DI.getService<ILogger>("ILogger"), configurationProvider.getConfiguration());
}
import koa from "koa";
import { AppConfig, AppContext, AppState, ILogger } from "../types";
import { jsonMiddleware, requestHandlerMiddleware, staticFilesMiddleware } from "./routes/middlewares";
import { Services } from "../instances";

export const mapMiddlewares = (app: koa<AppState, AppContext>, services: Services, configuration: AppConfig) => {
    jsonMiddleware(app);
    requestHandlerMiddleware(app, services.get<ILogger>("logger"));
    staticFilesMiddleware(app, services.get<ILogger>("logger"), configuration);
}
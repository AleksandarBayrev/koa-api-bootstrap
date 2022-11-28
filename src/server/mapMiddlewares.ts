import koa from "koa";
import { AppContext, AppServices, AppState } from "../types";
import { jsonMiddleware, requestHandlerMiddleware } from "./routes/middlewares";

export const mapMiddlewares = (app: koa<AppState, AppContext>, services: AppServices) => {
    jsonMiddleware(app);
    requestHandlerMiddleware(app, services.logger);
}
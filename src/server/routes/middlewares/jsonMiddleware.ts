import koa from "koa";
import bodyParser from "koa-bodyparser";
import { AppConfig, AppContext, AppState } from "../../../types";

export const jsonMiddleware = (app: koa<AppState, AppContext>, configuration: AppConfig) => {
    app.use(bodyParser({
        jsonLimit: configuration.jsonMiddlewareLimit
    }));
}
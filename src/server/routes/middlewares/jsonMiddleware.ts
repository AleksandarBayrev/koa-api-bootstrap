import koa from "koa";
import bodyParser from "koa-bodyparser";
import { AppContext, AppState } from "../../../types";

export const jsonMiddleware = (app: koa<AppState, AppContext>) => {
    app.use(bodyParser({
        jsonLimit: '100MB'
    }));
}
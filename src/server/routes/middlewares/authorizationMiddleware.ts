import koa from "koa";
import { AppContext, AppState } from "../../../types";

export const authorizationMiddleware = async (context: koa.ParameterizedContext<AppState, AppContext>, next: koa.Next) => {
    context.authorizationToken = "test";
    await next();
}
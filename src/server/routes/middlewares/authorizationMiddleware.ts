import koa from "koa";
import { IncomingHttpHeaders } from "http";
import { AppContext, AppState, UserModel } from "@app-types";

const tokenUserMap = new Map<string, UserModel>();
tokenUserMap.set('test', {id: '1', username: 'testUser'});

const tokenParser = (headers: IncomingHttpHeaders) => headers.authorization?.split("Bearer ")[1] || "";

export const authorizationMiddleware = async (context: koa.ParameterizedContext<AppState, AppContext>, next: koa.Next) => {
    context.user = tokenUserMap.get(tokenParser(context.headers));
    return await next();
}
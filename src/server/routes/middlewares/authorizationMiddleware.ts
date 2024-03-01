import koa from "koa";
import { AppContext, AppState } from "../../../types";
import { IncomingHttpHeaders } from "http";

const tokenUserMap = new Map<string, {id: string, username: string}>();
tokenUserMap.set('test', {id: '1', username: 'testUser'});

const tokenParser = (headers: IncomingHttpHeaders) => headers.authorization?.split("Bearer ")[1] || "";

export const authorizationMiddleware = async (context: koa.ParameterizedContext<AppState, AppContext>, next: koa.Next) => {
    context.user = tokenUserMap.get(tokenParser(context.headers));
    return await next();
}
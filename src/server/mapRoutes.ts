import koa from "koa";
import Router from "koa-router";
import { AppContext,  AppState } from "../types";
import { authorizationExampleRouteGet, indexRouteDelete, indexRouteGet, indexRoutePatch, indexRoutePost, indexRoutePut } from "./routes";
import { DependencyInjection } from "../base";

export const mapRoutes = (app: koa<AppState, AppContext>, DI: DependencyInjection) => {
    const router = new Router<AppState, AppContext>();
    indexRouteGet(router, DI);
    indexRouteDelete(router, DI);
    indexRoutePatch(router, DI);
    indexRoutePost(router, DI);
    indexRoutePut(router, DI);
    authorizationExampleRouteGet(router, DI);
    app.use(router.routes());
}
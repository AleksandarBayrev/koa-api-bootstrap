import koa from "koa";
import Router from "koa-router";
import { AppContext,  AppState } from "@app-types";
import { authorizationExampleRouteGet, healthcheckRouteGet, indexRouteDelete, indexRouteGet, indexRoutePatch, indexRoutePost, indexRoutePut } from "@app-server/routes";
import { DependencyInjection } from "@app-base";

export const mapRoutes = (app: koa<AppState, AppContext>, DI: DependencyInjection) => {
    const router = new Router<AppState, AppContext>();
    indexRouteGet(router, DI);
    indexRouteDelete(router, DI);
    indexRoutePatch(router, DI);
    indexRoutePost(router, DI);
    indexRoutePut(router, DI);
    authorizationExampleRouteGet(router, DI);
    healthcheckRouteGet(router, DI);
    app.use(router.routes());
}
import koa from "koa";
import Router from "koa-router";
import { AppContext,  AppState } from "../types";
import { indexRouteDelete, indexRouteGet, indexRoutePatch, indexRoutePost, indexRoutePut } from "./routes";
import { DependencyInjection } from "../base";

export const mapRoutes = (app: koa<AppState, AppContext>, DI: DependencyInjection) => {
    const router = new Router();
    indexRouteGet(router);
    indexRouteDelete(router);
    indexRoutePatch(router);
    indexRoutePost(router);
    indexRoutePut(router);
    app.use(router.routes());
}
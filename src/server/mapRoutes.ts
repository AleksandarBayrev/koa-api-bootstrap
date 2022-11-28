import koa from "koa";
import Router from "koa-router";
import { AppContext, AppServices, AppState } from "../types";
import { indexRouteDelete, indexRouteGet, indexRoutePatch, indexRoutePost, indexRoutePut } from "./routes";

export const mapRoutes = (app: koa<AppState, AppContext>, services: AppServices) => {
    const router = new Router();
    indexRouteGet(router);
    indexRouteDelete(router);
    indexRoutePatch(router);
    indexRoutePost(router);
    indexRoutePut(router);
    app.use(router.routes());
}
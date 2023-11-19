import koa from "koa";
import { AppState } from "./AppState";
import { AppContext } from "./AppContext";
import { DependencyInjection } from "../base";

export type RequestMediatorHandler = (DI: DependencyInjection, context: koa.ParameterizedContext<AppState, AppContext>, next: koa.Next) => Promise<any>;
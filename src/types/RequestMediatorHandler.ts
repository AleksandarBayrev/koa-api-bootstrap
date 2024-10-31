import koa from "koa";
import { AppState } from "./AppState";
import { AppContext } from "./AppContext";
import { DependencyInjection } from "@app-base";

export type RequestMediatorHandler = (DI: DependencyInjection, context: koa.ParameterizedContext<AppState, AppContext, any>, next: koa.Next) => Promise<void>;
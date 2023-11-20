import { DependencyInjection } from "./base";
import { enhanceClass } from "./base/enhanceClass";
import { indexRouteDeleteHandler, indexRouteGetHandler, indexRoutePatchHandler, indexRoutePostHandler, indexRoutePutHandler } from "./handlers";
import { indexRouteDeleteHandlerName, indexRouteGetHandlerName, indexRoutePatchHandlerName, indexRoutePostHandlerName, indexRoutePutHandlerName } from "./server/routes";
import { Logger, RequestMediator } from "./services";
import { AppConfig, ILogger, IRequestMediator } from "./types";

export const configureInstances = (DI: DependencyInjection, appConfig: AppConfig) => {
    enhanceClass(Logger, "Logger");
    enhanceClass(RequestMediator, "RequestMediator");
    DI.registerService<ILogger>("ILogger", "singleton", Logger, [appConfig]);
    const logger = DI.getService<ILogger>("ILogger");
    DI.registerService<IRequestMediator>("IRequestMediator", "singleton", RequestMediator, [logger]);
    const requestMediator = DI.getService<IRequestMediator>("IRequestMediator");
    requestMediator.addHandler(indexRouteGetHandlerName, indexRouteGetHandler);
    requestMediator.addHandler(indexRoutePostHandlerName, indexRoutePostHandler);
    requestMediator.addHandler(indexRoutePatchHandlerName, indexRoutePatchHandler);
    requestMediator.addHandler(indexRoutePutHandlerName, indexRoutePutHandler);
    requestMediator.addHandler(indexRouteDeleteHandlerName, indexRouteDeleteHandler);
}
import { DependencyInjection } from "./base";
import { enhanceClass } from "./base/enhanceClass";
import * as handlers from "./handlers";
import * as routes from "./server/routes";
import { Logger, RequestMediator } from "./services";
import { AppConfig, ILogger, IRequestMediator } from "./types";

export const configureInstances = (DI: DependencyInjection, appConfig: AppConfig) => {
    enhanceClass(Logger, "Logger");
    enhanceClass(RequestMediator, "RequestMediator");
    DI.registerService<ILogger>("ILogger", "singleton", Logger, [appConfig]);
    const logger = DI.getService<ILogger>("ILogger");
    DI.registerService<IRequestMediator>("IRequestMediator", "singleton", RequestMediator, [logger]);
    const requestMediator = DI.getService<IRequestMediator>("IRequestMediator");
    requestMediator.addHandler(routes.indexRouteGetHandlerName, handlers.indexRouteGetHandler);
    requestMediator.addHandler(routes.indexRoutePostHandlerName, handlers.indexRoutePostHandler);
    requestMediator.addHandler(routes.indexRoutePatchHandlerName, handlers.indexRoutePatchHandler);
    requestMediator.addHandler(routes.indexRoutePutHandlerName, handlers.indexRoutePutHandler);
    requestMediator.addHandler(routes.indexRouteDeleteHandlerName, handlers.indexRouteDeleteHandler);
    requestMediator.addHandler(routes.authorizationExampleRouteGetHandlerName, handlers.authorizationExampleRouteGetHandler);
}
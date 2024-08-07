import { DependencyInjection } from "./base";
import * as handlers from "./handlers";
import * as routes from "./server/routes";
import { ConfigurationProvider, Logger, RequestMediator, WorkerStorage } from "./services";
import { AppConfig, IConfigurationProvider, ILogger, IRequestMediator, IWorkerStorage } from "./types";

export const configureInstances = async (DI: DependencyInjection, appConfig: AppConfig) => {
    DI.registerService<IConfigurationProvider>("IConfigurationProvider", "singleton", ConfigurationProvider, [appConfig]);
    const configurationProvider = DI.getService<IConfigurationProvider>("IConfigurationProvider");
    DI.registerService<ILogger>("ILogger", "singleton", Logger, [configurationProvider.getConfiguration()]);
    const logger = DI.getService<ILogger>("ILogger");
    DI.registerService<IRequestMediator>("IRequestMediator", "singleton", RequestMediator, [logger]);
    DI.registerService<IWorkerStorage>("IWorkerStorage", "singleton", WorkerStorage, []);
    const workerStorage = DI.getService<IWorkerStorage>("IWorkerStorage");
    workerStorage.addWorker("Test", "./exampleWorker.js");
    const requestMediator = DI.getService<IRequestMediator>("IRequestMediator");
    requestMediator.addHandler(routes.indexRouteGetHandlerName, handlers.indexRouteGetHandler);
    requestMediator.addHandler(routes.indexRoutePostHandlerName, handlers.indexRoutePostHandler);
    requestMediator.addHandler(routes.indexRoutePatchHandlerName, handlers.indexRoutePatchHandler);
    requestMediator.addHandler(routes.indexRoutePutHandlerName, handlers.indexRoutePutHandler);
    requestMediator.addHandler(routes.indexRouteDeleteHandlerName, handlers.indexRouteDeleteHandler);
    requestMediator.addHandler(routes.authorizationExampleRouteGetHandlerName, handlers.authorizationExampleRouteGetHandler);
    if (configurationProvider.getConfiguration().useHealthcheck) {
        requestMediator.addHandler(routes.healthcheckRouteGetHandlerName, handlers.healthcheckRouteGetHandler);
    }
}
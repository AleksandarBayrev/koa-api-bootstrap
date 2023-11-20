import { DependencyInjection } from "../base";
import { ILogger, IRequestMediator, RequestMediatorHandler } from "../types";

export class RequestMediator implements IRequestMediator {
    private readonly logger: ILogger;
    private readonly handlers: Map<string, RequestMediatorHandler>;

    constructor(logger: ILogger) {
        this.logger = logger;
        this.handlers = new Map();
    }
    addHandler(handlerName: string, handler: RequestMediatorHandler) {
        this.logger.info(`Registering handler ${handlerName}`);
        this.handlers.set(handlerName, handler);
    }
    sendRequest(handlerName: string, DI: DependencyInjection, context: any, next: any) {
        this.logger.info(`Getting handler ${handlerName}`);
        const handler = this.handlers.get(handlerName);
        if (!handler) {
            throw new Error(`Handler ${handlerName} not registered!`);
        }
        this.logger.info(`Sending request to handler ${handlerName}`);
        return handler(DI, context, next);
    }
}
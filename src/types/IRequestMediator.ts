import { DependencyInjection } from '@app-base';
import { RequestMediatorHandler } from './RequestMediatorHandler';

export interface IRequestMediator {
    addHandler: (handlerName: string, handler: RequestMediatorHandler) => void;
    sendRequest: (handlerName: string, DI: DependencyInjection, context: any, next: any) => Promise<void>;
}
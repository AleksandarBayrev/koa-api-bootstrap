export interface IWorkerProcessor {
    processMessage<TRequest, TResponse>(workerName: string, request: TRequest): Promise<TResponse>;
}
import { enhanceClass } from "@app-root/base/enhanceClass";
import { ILogger, IWorkerProcessor, IWorkerStorage } from "@app-root/types";

export class WorkerProcessor implements IWorkerProcessor {
    private readonly processorCache: Map<string, Promise<any>>;
    constructor(
        private readonly logger: ILogger,
        private readonly workerStorage: IWorkerStorage
    ) {
        this.processorCache = new Map();
    }

    processMessage = <TRequest, TResponse>(workerName: string, request: TRequest) => {
        const worker = this.workerStorage.getWorker(workerName);
        return new Promise<TResponse>((res, rej) => {
            worker.removeAllListeners();

            worker.on("online", () => {
                this.logger.info(`Started processing request => ${JSON.stringify(request)}`);
            });

            worker.postMessage(request);

            const workerCallbacks = {
                onMessage: (data: TResponse) => {
                    res(data);
                },
                onError: (err: Error) => {
                    rej(err);
                }
            };

            worker.on("message", workerCallbacks.onMessage);
            worker.on("error", workerCallbacks.onError);
            worker.on("exit", (code: number) => {
                this.logger.info(`Finished processing request, status code: ${code}`);
                worker.removeAllListeners();
            });
        });
    }
}

enhanceClass(WorkerProcessor, "WorkerProcessor");
import { WorkerOptions, Worker } from "worker_threads";
import { IWorkerStorage } from "../types";
import { enhanceClass } from "../base/enhanceClass";

type WorkerInit = {
    script: string;
    options?: WorkerOptions;
}
export class WorkerStorage implements IWorkerStorage {
    private readonly workerSetup: Map<string, WorkerInit>;
    private readonly workers: Map<string, Worker>;
    constructor() {
        this.workerSetup = new Map();
        this.workers = new Map();
    }
    addWorker(name: string, script: string, options?: WorkerOptions | undefined): void {
        this.workerSetup.set(name, {script, options});
    }
    getWorker(name: string): Worker {
        const workerSetup = this.workerSetup.get(name);
        if (!workerSetup) {
            throw new Error(`Worker setup with name ${name} not registered!`);
        }
        const existingWorker = this.workers.get(name);
        if (!existingWorker) {
            const worker = new Worker(workerSetup.script, workerSetup.options);
            this.workers.set(name, worker);
            return worker;
        }
        return existingWorker;
    }
    deleteWorker(name: string): void {
        const worker = this.workers.get(name);
        if (!worker) {
            throw new Error(`Worker with name ${name} not registered!`);
        }
        worker.terminate();
        this.workerSetup.delete(name);
        this.workers.delete(name);
    }
}

enhanceClass(WorkerStorage, "WorkerStorage");
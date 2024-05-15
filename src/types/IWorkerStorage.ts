import { WorkerOptions, Worker } from "worker_threads";

export interface IWorkerStorage {
    addWorker(name: string, script: string, options?: WorkerOptions | undefined): void;
    getWorker(name: string): Worker;
    deleteWorker(name: string): void;
}
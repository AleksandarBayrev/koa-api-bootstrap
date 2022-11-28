export interface ILogger {
    log(message: string): Promise<void>;
    logObject<T>(object: T): Promise<void>;
}
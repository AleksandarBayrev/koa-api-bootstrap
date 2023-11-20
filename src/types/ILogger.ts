export interface ILogger {
    appInfo(message: string): Promise<void>;
    info(message: string): Promise<void>;
    infoObject<T>(object: T): Promise<void>;
    warn(message: string): Promise<void>;
    warnObject<T>(object: T): Promise<void>;
    error(message: string): Promise<void>;
    errorObject<T>(object: T): Promise<void>;
}
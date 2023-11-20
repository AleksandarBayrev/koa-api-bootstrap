import { LogLevel } from "./LogLevel";

type StaticFileServingOptions = {
    enabled: boolean;
    path: string;
}

export type AppConfig = {
    logTotalHeapOnStartup: boolean;
    minLogLevel: LogLevel;
    port: number;
    staticFileServing?: StaticFileServingOptions;
}
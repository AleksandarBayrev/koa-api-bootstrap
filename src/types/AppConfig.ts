import { LogLevel } from "./LogLevel";

type StaticFileServingOptions = {
    enabled: boolean;
    path: string;
}

export type AppConfig = {
    logTotalHeapOnStartup: boolean;
    minLogLevel: LogLevel;
    developerMode: boolean;
    port: number;
    useCors: boolean;
    useHealthcheck: boolean;
    staticFileServing?: StaticFileServingOptions;
}
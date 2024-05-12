import { ApplicationMode } from "./ApplicationMode";
import { LogLevel } from "./LogLevel";

type StaticFileServingOptions = {
    enabled: boolean;
    path: string;
}

export type AppConfig = {
    mode: ApplicationMode;
    logTotalHeapOnStartup: boolean;
    minLogLevel: LogLevel;
    developerMode: boolean;
    port: number;
    useHealthcheck: boolean;
    staticFileServing?: StaticFileServingOptions;
    jsonMiddlewareLimit: string;
}
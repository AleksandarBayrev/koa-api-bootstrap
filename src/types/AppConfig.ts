type StaticFileServingOptions = {
    enabled: boolean;
    path: string;
}

export type AppConfig = {
    logTotalHeapOnStartup: boolean;
    port: number;
    staticFileServing?: StaticFileServingOptions;
}
type StaticFileServingOptions = {
    enabled: boolean;
    path: string;
}

export type AppConfig = {
    port: number;
    staticFileServing?: StaticFileServingOptions;
}
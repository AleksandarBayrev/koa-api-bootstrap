export type IndexRouteGetResponse<TData> = {
    message: string;
    dataSize: number;
    data?: TData;
}
export type AddMessage = {
    action: "add";
    data: DataToStore;

}
export type RemoveMessage = {
    action: "remove";
    id: string;
}

export type GetAllMessages = {
    action: "getAll";
}

export type GetMessage = {
    action: "getAll";
    id: string;
}
export type DataToStore = {
    id: string;
    text: string;
}
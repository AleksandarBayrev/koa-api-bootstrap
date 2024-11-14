import { parentPort } from "worker_threads";
type AddMessage = {
    action: "add";
    data: string;
}
type RemoveMessage = {
    action: "remove";
    index: number;
}
type GetMessage = {
    action: "get";
    index: number;
}
if (parentPort) {
    const data: string[] = [];
    const callbacks = {
        add: (message: AddMessage) => {
            data.push(message.data);
            parentPort!.postMessage(data);
        },
        remove: (message: RemoveMessage) => {
            data.splice(message.index, 1);
            parentPort!.postMessage(data);
        },
        get: (message: GetMessage) => {
            parentPort!.postMessage(data[message.index]);
        }
    }
    parentPort.on("message", (message: AddMessage | RemoveMessage | GetMessage) => {
        if (!parentPort) {
            throw new Error("Failed to get parent port! (Maybe the script is run directly?)");
        }
        const callback = callbacks[message.action];
        if (!callback) {
            parentPort.postMessage(`Error! Callback for action ${message.action} not found.`);
        }
        callbacks[message.action](message as any);
    });
}
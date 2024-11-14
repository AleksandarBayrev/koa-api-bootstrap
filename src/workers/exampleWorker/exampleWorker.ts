import { parentPort } from "worker_threads";
import { DataToStore, AddMessage, RemoveMessage, GetAllMessages, GetMessage } from "./types";
if (parentPort) {
    const data: DataToStore[] = [];
    const callbacks = {
        add: (message: AddMessage) => {
            data.push(message.data);
            parentPort!.postMessage(data);
        },
        remove: (message: RemoveMessage) => {
            data.splice(data.findIndex(x => x.id === message.id), 1);
            parentPort!.postMessage(data);
        },
        getAll: (message: GetAllMessages) => {
            parentPort!.postMessage(data);
        },
        get: (message: GetMessage) => {
            parentPort!.postMessage(data.find(x => x.id === message.id));
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
        try {
            callbacks[message.action](message as any);
        } catch (err) {
            parentPort.postMessage({error: err})
        }
    });
}
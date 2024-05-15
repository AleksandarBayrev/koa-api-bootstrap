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
}
if (parentPort) {
    const data: string[] = [];
    const callbacks = {
        add: (message: AddMessage) => {
            console.log(`Adding ${JSON.stringify(message.data)}`);
            data.push(message.data);
            console.log(`Data length ${data.length}`);
            parentPort!.postMessage(data);
        },
        remove: (message: RemoveMessage) => {
            console.log(`Removing`);
            data.splice(message.index, 1);
            parentPort!.postMessage(data);
        },
        get: (message: GetMessage) => {
            console.log('Getting')
            parentPort!.postMessage(data);
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
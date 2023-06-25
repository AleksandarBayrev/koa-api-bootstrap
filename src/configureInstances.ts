import { Services } from "./instances";
import { Logger } from "./services";
import { ILogger } from "./types";

export const configureInstances = (services: Services) => {
    services.add<ILogger>("logger", new Logger());
}
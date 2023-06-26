import { DependencyInjection } from "./base";
import { Logger } from "./services";
import { ILogger } from "./types";

export const configureInstances = (DI: DependencyInjection) => {
    DI.registerService<ILogger>("ILogger", "singleton", Logger, []);
}
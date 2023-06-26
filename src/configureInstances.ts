import { DependencyInjection } from "./base";
import { enhanceClass } from "./base/enhanceClass";
import { Logger } from "./services";
import { ILogger } from "./types";

export const configureInstances = (DI: DependencyInjection) => {
    enhanceClass(Logger, "Logger");
    DI.registerService<ILogger>("ILogger", "singleton", Logger, []);
}
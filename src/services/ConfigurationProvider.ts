import { enhanceClass } from "../base/enhanceClass";
import { AppConfig, IConfigurationProvider } from "../types";

export class ConfigurationProvider implements IConfigurationProvider {
    constructor(private readonly configuration: AppConfig) { }
    getConfiguration(): AppConfig {
        return { ...this.configuration };
    }
}

enhanceClass(ConfigurationProvider, "ConfigurationProvider");
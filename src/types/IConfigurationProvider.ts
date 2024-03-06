import { AppConfig } from "./AppConfig";

export interface IConfigurationProvider {
    getConfiguration(): AppConfig;
}
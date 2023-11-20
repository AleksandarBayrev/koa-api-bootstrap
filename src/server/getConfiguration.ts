import { AppConfig, LogLevel } from '../types';
import fs from 'fs/promises';
import path from 'path';
import { ConfigFileName } from '../constants';

export const getConfiguration = async (): Promise<AppConfig> => {
    const fileContents = await fs.readFile(path.join(__dirname, ConfigFileName));
    var configuration: AppConfig = JSON.parse(fileContents.toString());
    if (configuration.minLogLevel > LogLevel.Error || configuration.minLogLevel < LogLevel.Info) {
        throw new Error('Invalid `minLogLevel` value in config.json! Valid values are: 0 (Info) / 1 (Warn) / 2 (Error)');
    }
    return configuration;
}
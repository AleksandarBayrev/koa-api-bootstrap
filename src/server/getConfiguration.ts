import { AppConfig } from '../types';
import { ConfigFileName } from '../constants';
import fs from 'fs/promises';
import path from 'path';
import { Helpers } from '../Helpers';

export const getConfiguration = async (): Promise<AppConfig> => {
    const fileContents = await fs.readFile(path.join(__dirname, ConfigFileName));
    var configuration: AppConfig = JSON.parse(fileContents.toString());
    const configurationValidationResult = Helpers.validateApplicationConfiguration(configuration);
    if (!configurationValidationResult.valid) {
        throw new Error(`Invalid application configuration:\n${configurationValidationResult.problems.map(x => `*) ${x}`).join('\n')}`);
    }
    return configuration;
}
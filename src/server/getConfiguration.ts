import fs from 'fs/promises';
import path from 'path';
import { AppConfig } from '@app-types';
import { ConfigFileName } from '@app-constants';
import { Helpers } from '@app-helpers';

export const getConfiguration = async (): Promise<AppConfig> => {
    const fileContents = await fs.readFile(path.join(__dirname, ConfigFileName));
    var configuration: AppConfig = JSON.parse(fileContents.toString());
    const configurationValidationResult = Helpers.validateApplicationConfiguration(configuration);
    if (!configurationValidationResult.valid) {
        throw new Error(`Invalid application configuration:\n${configurationValidationResult.problems.map(x => `*) ${x}`).join('\n')}`);
    }
    return configuration;
}
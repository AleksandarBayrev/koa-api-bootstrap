import { AppConfig } from '../types';
import fs from 'fs/promises';
import path from 'path';
import { ConfigFileName } from '../constants';

export const getConfiguration = async (): Promise<AppConfig> => {
    const fileContents = await fs.readFile(path.join(__dirname, ConfigFileName));
    return JSON.parse(fileContents.toString());
}
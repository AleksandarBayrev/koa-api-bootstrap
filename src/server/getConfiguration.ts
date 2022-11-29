import { AppConfig } from '../types';
import fs from 'fs';
import path from 'path';
import { ConfigFileName } from '../constants';

export const getConfiguration = (): AppConfig => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, ConfigFileName)).toString());
}
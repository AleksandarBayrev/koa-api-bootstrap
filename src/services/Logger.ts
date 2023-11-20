import { Helpers } from '../Helpers';
import { AppConfig, ILogger, LogLevel } from '../types';

export class Logger implements ILogger {
    constructor(private readonly appConfig: AppConfig) { }

    async appInfo(message: string) {
        const logLevel = LogLevel.AppInfo;
        console.log(`(${Helpers.getLogLevel(logLevel)}) [${this.currentDateISO}] => ${message}`);
    }

    async info(message: string) {
        const logLevel = LogLevel.Info;
        if (logLevel >= this.appConfig.minLogLevel) {
            console.log(`(${Helpers.getLogLevel(logLevel)}) [${this.currentDateISO}] => ${message}`);
        }
    }

    async infoObject<T>(object: T) {
        const logLevel = LogLevel.Info;
        if (logLevel >= this.appConfig.minLogLevel) {
            console.log(`(${Helpers.getLogLevel(logLevel)}) [${this.currentDateISO}] => `, object);
        }
    }

    async warn(message: string) {
        const logLevel = LogLevel.Warn;
        if (logLevel >= this.appConfig.minLogLevel) {
            console.log(`(${Helpers.getLogLevel(logLevel)}) [${this.currentDateISO}] => ${message}`);
        }
    }

    async warnObject<T>(object: T) {
        const logLevel = LogLevel.Warn;
        if (logLevel >= this.appConfig.minLogLevel) {
            console.log(`(${Helpers.getLogLevel(logLevel)}) [${this.currentDateISO}] => `, object);
        }
    }

    async error(message: string) {
        const logLevel = LogLevel.Error;
        if (logLevel >= this.appConfig.minLogLevel) {
            console.log(`(${Helpers.getLogLevel(logLevel)}) [${this.currentDateISO}] => ${message}`);
        }
    }

    async errorObject<T>(object: T) {
        const logLevel = LogLevel.Error;
        if (logLevel >= this.appConfig.minLogLevel) {
            console.log(`(${Helpers.getLogLevel(logLevel)}) [${this.currentDateISO}] => `, object);
        }
    }

    private get currentDateISO() {
        return new Date().toISOString();
    }
}
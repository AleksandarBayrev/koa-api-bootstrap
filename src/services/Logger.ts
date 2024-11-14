import { Helpers } from '@app-helpers';
import { enhanceClass } from '@app-base/enhanceClass';
import { AppConfig, ILogger, LogLevel } from '@app-types';

export class Logger implements ILogger {
    constructor(private readonly appConfig: AppConfig) { }

    appInfo = async (message: string) => {
        const logLevel = LogLevel.AppInfo;
        console.log(`(${Helpers.getLogLevel(logLevel)}) [${this.currentDateISO}] => ${message}`);
    }

    info = async (message: string) => {
        const logLevel = LogLevel.Info;
        if (logLevel >= this.appConfig.minLogLevel) {
            console.log(`(${Helpers.getLogLevel(logLevel)}) [${this.currentDateISO}] => ${message}`);
        }
    }

    infoObject = async <T>(object: T) => {
        const logLevel = LogLevel.Info;
        if (logLevel >= this.appConfig.minLogLevel) {
            console.log(`(${Helpers.getLogLevel(logLevel)}) [${this.currentDateISO}] => `, object);
        }
    }

    warn = async (message: string) => {
        const logLevel = LogLevel.Warn;
        if (logLevel >= this.appConfig.minLogLevel) {
            console.log(`(${Helpers.getLogLevel(logLevel)}) [${this.currentDateISO}] => ${message}`);
        }
    }

    warnObject = async <T>(object: T) => {
        const logLevel = LogLevel.Warn;
        if (logLevel >= this.appConfig.minLogLevel) {
            console.log(`(${Helpers.getLogLevel(logLevel)}) [${this.currentDateISO}] => `, object);
        }
    }

    error = async (message: string) => {
        const logLevel = LogLevel.Error;
        if (logLevel >= this.appConfig.minLogLevel) {
            console.log(`(${Helpers.getLogLevel(logLevel)}) [${this.currentDateISO}] => ${message}`);
        }
    }

    errorObject = async <T>(object: T) => {
        const logLevel = LogLevel.Error;
        if (logLevel >= this.appConfig.minLogLevel) {
            console.log(`(${Helpers.getLogLevel(logLevel)}) [${this.currentDateISO}] => `, object);
        }
    }

    private get currentDateISO() {
        return new Date().toISOString();
    }
}

enhanceClass(Logger, "Logger");
import { AppConfig, ConfigurationValidationResult, ILogger, LogLevel } from "./types";

export class Helpers {
    private constructor() {}
    static getLogLevel(logLevel: LogLevel) {
        switch (logLevel) {
            case LogLevel.Error:
                return 'Error';
            case LogLevel.Warn:
                return 'Warn';
            case LogLevel.AppInfo:
                return 'AppInfo';
            case LogLevel.Info:
            default:
                return 'Info';
        }
    }
    static logFlags(config: AppConfig, logger: ILogger) {
        Helpers.logTotalHeapOnStartup(config, logger);
        Helpers.logDeveloperMode(config, logger);
        Helpers.logHealthcheck(config, logger);
    }
    static validateApplicationConfiguration(configuration: AppConfig): ConfigurationValidationResult {
        const problems: string[] = [];
        Helpers.validateMinLogLevel(configuration, problems);
        return {
            valid: problems.length === 0,
            problems
        }
    }

    //#region flags loggers
    private static logTotalHeapOnStartup(config: AppConfig, logger: ILogger) {
        if (config.logTotalHeapOnStartup) {
            logger.infoObject(process.memoryUsage());
        }
    }
    private static logDeveloperMode(config: AppConfig, logger: ILogger) {
        if (config.developerMode) {
            logger.warn('Developer mode enabled, not recommended unless you want to debug some issue!');
        }
    }
    private static logHealthcheck(config: AppConfig, logger: ILogger) {
        if (config.useHealthcheck) {
            logger.info('Registering /healthcheck GET endpoint. Please configure healthcheck descriptors in the handler');
        }
    }
    //#endregion
    //#region configuration validators
    private static validateMinLogLevel(config: AppConfig, problems: string[]) {
        if (config.minLogLevel > LogLevel.Error || config.minLogLevel < LogLevel.Info) {
            problems.push('Invalid `minLogLevel` value in config.json! Valid values are: 0 (Info) / 1 (Warn) / 2 (Error)');
        }
        if (config.mode === "production") {
            if (config.minLogLevel !== LogLevel.Error) {
                problems.push('Invalid `minLogLevel` value in config.json for production mode, only errors allowed! Valid value is: 2 (Error)');
            }
        }
    }
    //#endregion
}
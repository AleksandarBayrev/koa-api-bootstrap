import { AppConfig, ILogger, LogLevel } from "./types";

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
}
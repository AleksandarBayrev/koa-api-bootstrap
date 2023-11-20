import { LogLevel } from "./types";

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
}
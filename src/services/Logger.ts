import { ILogger } from '../types';

export class Logger implements ILogger {
    async log(message: string) {
        console.log(`[${this.currentDateISO}] => ${message}`);
    }
    async logObject<T>(object: T) {
        console.log(`[${this.currentDateISO}] => `, object);
    }

    private get currentDateISO() {
        return new Date().toISOString();
    }
}
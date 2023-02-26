import { LoggerService, Injectable, Logger, ConsoleLogger } from "@nestjs/common";

import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

@Injectable()
export class MyLogger extends ConsoleLogger implements LoggerService {

    constructor(
        private readonly level: string
    ) {
        super();
        this.createLogFile();
        // if (process.env.LOG_LEVEL) {
        //     this.level = process.env.LOG_LEVEL;
        // }
        dotenv.config();
    }

    private logLevels = process.env.LOG_LEVEL || 'info';

    // const logLevel = process.env.LOG_LEVEL;
    // const debugLevel = process.env.DEBUG_LEVEL;
    // const errorLevel = process.env.ERROR_LEVEL;

    private logger = new Logger('LoggingService');

    private logFilePath = path.join(__dirname, 'app.log');
    private logFileSizeInKB = 1000;

    private logContent = fs.readFileSync(this.logFilePath, 'utf-8');

    private createLogFile() {

        if (!fs.existsSync(this.logFilePath)) {
            fs.writeFileSync(this.logFilePath, '');
        }
    }

    public log(message: string, context?: any) {
        if (this.useLog('info')) {
            super.log(`${message}`);

            this.writeToFile(`[INFO] ${message}`);
        }
        // process.stdout.write(`${message}, ${context}`);
    }

    public error(error: Error) {
        if (this.useLog('error')) {
            this.logger.error(`Error occurred: ${error.message}`);
            this.writeToFile(`[ERROR] ${error.message} ${error.stack}`);
        }
        // this.logger.error(`Stack trace: ${error.stack}`);
        // this.logger.error(`Stack trace: ${trace}`);
    }

    public warn(message: string, context?: any) {
        if (this.useLog('warn')) {
            super.warn(`${message}`);

            this.writeToFile(`[WARN] ${message}`);
        }
    }

    public debug(message: string, context?: any) {
        if (this.useLog('debug')) {
            super.debug(`[DEBUG] ${context ? `${context} - ` : ''}${message}`);

            this.writeToFile(`[DEBUG] ${context ? `${context} - ` : ''}${message}`);
        }
    }

    logUncaughtException(error: Error) {
        this.logger.error(`Uncaught exception occurred: ${error.message}`);
        this.logger.error(`Stack trace: ${error.stack}`);

        this.writeToFile(`[ERROR] ${error.message} ${error.stack}`);

        // this.logger.log('Hi, logUncaughtException');
    }

    logUnhandledRejection(reason: any, promise: Promise<any>) {
        this.logger.error(`Unhandled rejection occurred: ${reason}`);

        this.writeToFile(`[Unhandled rejection] : ${reason}`);

        // this.logger.log('Hi, logUnhandledRejection');
    }

    writeToFile(log: string) {
        const timeStamp = new Date().toISOString();

        const logLine = `${timeStamp} - ${log}\n`;

        const stats = fs.statSync(this.logFilePath);
        const fileSizeBt = stats.size;
        const fileSizeKB = fileSizeBt / 1000;

        if (fileSizeKB > this.logFileSizeInKB) {
            this.rotateLogFile();
        }

        fs.appendFile(this.logFilePath, logLine, (error) => {
            if (error) {
                this.logger.error(`Failed to write log to file ${error}`);
            }
        });
    }

    rotateLogFile() {
        const timeStamp = new Date().getTime();

        const backupLogFilePath = `${this.logFilePath}.${timeStamp}`;

        fs.renameSync(this.logFilePath, backupLogFilePath);
    }

    private useLog(level: string): boolean {
        return ['info', 'error', 'warn', 'debug'].indexOf(this.logLevels) >=
            ['info', 'error', 'warn', 'debug'].indexOf(level);
    }

    // private useLog(level: string): boolean {


    // error(message: any, trace?: string, context?: string) {
    //     super.error(message, trace, context);
    // }

    //   warn(message: any, context?: string) {
    //     super.warn(message, context);
    //   }

    //   debug(message: any, context?: string) {
    //     super.debug(message, context);
    //   }

    //   verbose(message: any, context?: string) {
    //     super.verbose(message, context);
    //   }
}
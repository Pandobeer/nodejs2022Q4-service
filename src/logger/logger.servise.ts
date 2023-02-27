import { LoggerService, Injectable, Logger, ConsoleLogger } from "@nestjs/common";

import * as fs from 'fs';
import * as path from 'path';
import { Request, Response } from 'express';

enum LoggingLevels {
    ERROR = 0,
    WARN = 1,
    LOG = 2,
    DEBUG = 3,
    VERBOSE = 4,
}

@Injectable()
export class MyLogger extends ConsoleLogger implements LoggerService {

    constructor(
    ) {
        super();
        this.createLogFile();
    }

    public getpathToLogFile() {
        const logDir = path.join(process.cwd(), 'logs');

        fs.mkdirSync(logDir, { recursive: true });

        const logFilePath = path.join(logDir, 'logs.txt');
        console.log(12, this.logFilePath);

        return logFilePath;
    }

    logFilePath = this.getpathToLogFile();

    // makeNewFolder() {
    //     const newFolderPath = path.join(__dirname, 'src', 'new_folder');
    //     const newFilePath = path.join(newFolderPath, 'new_file.txt');

    //     if (!fs.existsSync(newFolderPath)) {
    //         fs.mkdirSync(newFolderPath);
    //     }

    //     fs.writeFileSync(newFilePath, 'Hello World!');
    // }

    private logFileSizeInKB = +process.env.LOG_FILE_SIZE;

    // private logContent = fs.readFileSync(this.logFilePath, 'utf-8');

    private readonly logLevel = process.env.LOG_LEVEL || 0;


    private writeLog(message: string, level: LoggingLevels) {

        console.log(level, LoggingLevels[level]);
        // this.makeNewFolder();

        if (level <= this.logLevel) {
            super[LoggingLevels[level].toLowerCase()](message);

            this.writeToFile(`[${LoggingLevels[level]}] ${message}\n`);
        }
    }

    private createLogFile() {
        console.log(11, this.logFilePath);

        if (!fs.existsSync(this.logFilePath)) {
            fs.writeFileSync(this.logFilePath, '');
        }
    }

    loggingRequest(req: Request, res: Response) {
        const { method, originalUrl: url, query, body } = req;

        const requestTimestamp = new Date().toISOString();
        const requestMessage = `${requestTimestamp} Incoming request - ${method} ${url} - Query: ${JSON.stringify(
            query,
        )} - Body: ${JSON.stringify(body)}`;

        super.log(requestMessage);

        res.on('finish', () => {
            const responseTimestamp = new Date().toISOString();
            const responseMessage = `${responseTimestamp} Response: ${method} ${url} Response status code: ${res.statusCode}`;

            super.log(responseMessage);
        });
    }

    public error(error: Error) {
        this.writeLog(error.message, LoggingLevels.ERROR);

        // this.logger.error(`Stack trace: ${error.stack}`);
        // this.logger.error(`Stack trace: ${trace}`);
    }

    public warn(message: string) {
        this.writeLog(message, LoggingLevels.WARN);
    }

    public log(message: string) {
        this.writeLog(message, LoggingLevels.LOG);
    }


    public debug(message: string) {
        this.writeLog(message, LoggingLevels.DEBUG);
    }

    public verbose(message: string) {
        this.writeLog(message, LoggingLevels.VERBOSE);

    }

    logUncaughtException(error: Error) {
        super.error(`Uncaught exception occurred: ${error.message}`);
        super.error(`Stack trace: ${error.stack}`);

        this.writeLog(error.message, LoggingLevels.ERROR);

    }

    logUnhandledRejection(reason: any, promise: Promise<any>) {
        super.error(`Unhandled rejection occurred: ${reason}`);

        this.writeToFile(`[Unhandled rejection] : ${reason}`);
    }

    writeToFile(log: string) {
        const timeStamp = new Date().toISOString();

        const logLine = `${timeStamp} - ${log}\n`;

        const stats = fs.statSync(this.logFilePath);

        const fileSizeBt = stats.size;
        const fileSizeMB = fileSizeBt / 10000;

        if (fileSizeMB > this.logFileSizeInKB) {
            this.rotateLogFile();
        }

        fs.appendFile(this.logFilePath, logLine, (error) => {
            if (error) {
                super.error(`Failed to write log to file ${error}`);
            }
        });
    }

    rotateLogFile() {
        const timeStamp = new Date().getTime();

        const backupLogFilePath = `${this.logFilePath}.${timeStamp}`;

        fs.renameSync(this.logFilePath, backupLogFilePath);
    }
}
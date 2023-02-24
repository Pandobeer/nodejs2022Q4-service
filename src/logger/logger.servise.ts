import { LoggerService, Injectable, Logger, ConsoleLogger } from "@nestjs/common";

import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MyLogger extends ConsoleLogger implements LoggerService {

    constructor() {
        super();
        this.createLogFile();
    }

    private logger = new Logger('LoggingService');

    private logFilePath = path.join(__dirname, 'app.log');

    private createLogFile() {
        if (!fs.existsSync(this.logFilePath)) {
            fs.writeFileSync(this.logFilePath, '');
        }
    }

    // customLog() {
    //     this.log('Hi');
    // }
    public log(message: string, context?: any) {
        super.log(message, context);
        this.writeToFile(`[INFO] ${message}`);
    }

    // log(req: any) {
    //     super.log(`Request URL: ${req.url}`);
    // }

    // log(req: any) {
    //     //     this.logger.log(`Request URL: ${req.url}`);
    //     // };
    public logError(error: Error) {
        this.logger.error(`Error occurred: ${error.message}`);
        this.logger.error(`Stack trace: ${error.stack}`);
        this.writeToFile(`[ERROR] ${error.message}`);
    }

    logUncaughtException(error: Error) {
        this.logger.error(`Uncaught exception occurred: ${error.message}`);
        this.logger.error(`Stack trace: ${error.stack}`);
    }

    logUnhandledRejection(reason: any, promise: Promise<any>) {
        this.logger.error(`Unhandled rejection occurred: ${reason}`);
    }

    private writeToFile(log: string) {
        const timeStamp = new Date().toISOString();
        const logLine = `${timeStamp} - ${log}\n`;

        fs.appendFile(this.logFilePath, logLine, (error) => {
            if (error) {
                this.logger.error(`Failed to write log to file ${error}`);
            }
        });
    }
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

// export class MyLogger implements LoggerService {
//     constructor(private readonly logger: Logger) { };
//     // private logger = new Logger('LoggingService');
//     // log(req: any) {
//     //     this.logger.log(`Request URL: ${req.url}`);
//     // };

//     // logResponse(res: any): void {
//     //     this.logger.debug(`Response Status Code: ${res.statusCode}`);
//     // }
//     log(message: string, context?: string) {
//         this.logger.log(message, context);
//     }

//     error(message: string, context?: string) {
//         this.logger.error(message, context);
//     }

//     warn(message: string, context?: string) {
//         this.logger.warn(message, context);
//     }

//     debug?(message: string, context?: string) {
//         this.logger.debug(message, context);
//     }

//     verbose?(message: string, context?: string) {
//         this.logger.verbose(message, context);
//     }
// }
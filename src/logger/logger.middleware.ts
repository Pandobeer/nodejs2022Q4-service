// import { Logger } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { NestMiddleware } from "@nestjs/common/interfaces/middleware";
import { NextFunction, Request, Response } from "express";
import { MyLogger } from "./logger.servise";

@Injectable()
export class LoggerMidleware implements NestMiddleware {
    constructor(
        private readonly logger: MyLogger) { }

    // private logger = new Logger(`HTTP`);

    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl, body, query } = req;

        this.logger.log(`Logging request: ${method}, URL: ${originalUrl}, Query: ${JSON.stringify(query)}, Body: ${JSON.stringify(body)}`);
        // this.logger.log(`URL: ${originalUrl}`);
        // this.logger.log(`Query: ${JSON.stringify(query)}`);
        // this.logger.log(`Body: ${JSON.stringify(body)}`);

        res.on('finish', () => {
            const { statusCode } = res;

            this.logger.log(`Status code: ${statusCode}`);
        });

        next();
    }
}
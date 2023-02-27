import { Injectable } from "@nestjs/common/decorators";
import { NestMiddleware } from "@nestjs/common/interfaces/middleware";
import { NextFunction, Request, Response } from "express";
import { MyLogger } from "./logger.servise";

@Injectable()
export class LoggerMidleware implements NestMiddleware {
    constructor(
        private readonly loggingService: MyLogger) { }

    use(req: Request, res: Response, next: NextFunction) {

        this.loggingService.loggingRequest(req, res);

        next();
    }
}
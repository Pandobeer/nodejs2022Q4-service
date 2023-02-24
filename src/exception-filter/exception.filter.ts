import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus, HttpException } from "@nestjs/common";
import { MyLogger } from "src/logger/logger.servise";
import { Request, Response } from 'express';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly loggingService: MyLogger
    ) { }

    catch(exception: unknown, host: ArgumentsHost) {
        // super.catch(exception, host);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const request = ctx.getRequest<Request>();
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal Server Error';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.message;
        }

        this.loggingService.error(`Error: ${message}`);

        response.status(status).json({
            statusCode: status,
            message
        });
        // const status = exception.getStatus();
    }
}
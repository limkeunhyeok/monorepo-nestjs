import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { CustomException } from "./custom-exception";
import { ExceptionCode } from "./exception-code";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let result = {};
    let status;

    if (exception instanceof CustomException) {
      const { code, name, message } = exception;
      result = { code, name, message };
      status = code.status;
    } else if (exception instanceof NotFoundException) {
      const { name, message } = <Error>exception;
      result = { code: ExceptionCode.NOT_FOUND_API, name, message };
      status = ExceptionCode.NOT_FOUND_API.status;
    } else {
      const { name, message, stack } = <Error>exception;
      result = { code: ExceptionCode.SERVER_ERROR, name, message };
      status = ExceptionCode.SERVER_ERROR.status;
    }

    response.status(status).json({
      ...result,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

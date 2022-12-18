import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const { status, name, message } = this.getExceptionSpec(exception);

    const responseBody = {
      status,
      name,
      message,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, status);
  }

  private getExceptionSpec(exception: unknown) {
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const { name, message } = exception;
      return { status, name, message };
    }
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      name: "INTERNAL_SERVER_ERROR",
      message: "internal server error",
    };
  }
}

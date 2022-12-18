import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  LoggerService,
  NestInterceptor,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    const contextType = context.getType();

    if (contextType === "http") {
      const receivedHttp = context.switchToHttp();
      const req: Request = receivedHttp.getRequest();
      const res: Response = receivedHttp.getResponse();
      const { baseUrl, method, headers, query, body } = req;

      return next.handle().pipe(
        tap(() => {
          const { statusCode } = res;
          this.logger.log(
            JSON.stringify({
              baseUrl,
              method,
              headers,
              query,
              body,
              statusCode,
            })
          );
        })
      );
    }
  }
}

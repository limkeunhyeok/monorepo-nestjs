import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { LogCategory, winstonLogger } from "../lib/logger";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    if (context.getType() === "http") {
      const received = context.switchToHttp();
      const res = received.getResponse();

      winstonLogger.debug({
        message: `!!!!${res}`,
        category: LogCategory.MessageReceived,
      });

      return next.handle();
    }
  }
}

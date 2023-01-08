import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { LogCategory, winstonLogger } from "../lib/logger";

// MQ message 받을 때 로깅
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    if (context.getType() === "rpc") {
      const receivedRpc = context.switchToRpc();
      const receivedController = context.getClass();
      const receivedHandler = context.getHandler();

      const logMessage = `To Class : "${
        receivedController.name
      }", which Handler : "${
        receivedHandler.name
      }", with received Data : "${JSON.stringify(receivedRpc.getData())}"`;

      winstonLogger.debug({
        message: logMessage,
        category: LogCategory.MessageReceived,
      });

      return next.handle();
    }
  }
}

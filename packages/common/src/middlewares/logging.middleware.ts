import { Injectable, LoggerService, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { winstonLogger } from "../lib";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger: LoggerService = winstonLogger;

  use(req: Request, res: Response, next: NextFunction) {
    const { baseUrl, method, headers, query, body } = req;

    res.on("finish", () => {
      const { statusCode } = res;
      this.logger.log(
        JSON.stringify({
          baseUrl,
          method,
          headers,
          query,
          body,
          statusCode,
        }),
        "http"
      );
    });

    next();
  }
}

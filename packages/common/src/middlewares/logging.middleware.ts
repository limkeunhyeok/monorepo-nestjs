import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { LogCategory, logger } from "../lib";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor() {}

  use(req: Request, res: Response, next: NextFunction) {
    const { baseUrl, method, headers, query, body } = req;

    res.on("close", () => {
      const { statusCode } = res;

      logger.http({
        message: JSON.stringify({
          baseUrl,
          method,
          headers,
          query,
          body,
          statusCode,
        }),
        category: LogCategory.HttpRequest,
      });
    });

    next();
  }
}

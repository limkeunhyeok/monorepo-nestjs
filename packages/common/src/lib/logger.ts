import * as winston from "winston";

export const LogCategory = {
  Initializer: "Initializer",
  BaseTransfer: "BaseTransfer",
  UnhandledError: "UnhandledError",
  HttpRequest: "HttpRequest",
  HttpResponse: "HttpResponse",
  HttpException: "HttpException",
  DBFail: "DBFail",
  DataResource: "DataResource",
  JsonWebToken: "JsonWebToken",
  Account: "Account",
  Permission: "Permission",
  Parsing: "Parsing",
} as const;

export type LogCategory = typeof LogCategory[keyof typeof LogCategory];

export const LogLevel = {
  Verbose: 0,
  Debug: 1,
  Info: 2,
  Warn: 3,
  Error: 4,
};

export type LogLevel = typeof LogLevel[keyof typeof LogLevel];

export const consoleFormat = () =>
  winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint()
  );

export let loggerInstance: winston.Logger;

export const getLogger = () =>
  winston.createLogger({
    transports: [new winston.transports.Console({ format: consoleFormat() })],
    level: process.env.LOG_CONSOLE_LEVEL,
  });

export const init = () => {
  loggerInstance = getLogger();
};

export interface LogOptions {
  message: string | Record<string, unknown>;
  category: LogCategory;
}

export interface ErrorLogOptions extends LogOptions {
  error: Error;
}

export const logger = {
  error: (options: ErrorLogOptions) => {
    const { message, category, error } = options;

    loggerInstance.error({
      message,
      error,
      category,
    });
  },
  warn: (options: LogOptions) => {
    const { message, category } = options;

    loggerInstance.warn({
      message,
      category,
    });
  },
  info: (options: LogOptions) => {
    const { message, category } = options;

    loggerInstance.info({
      message,
      category,
    });
  },
  http: (options: LogOptions) => {
    const { message, category } = options;

    loggerInstance.http({
      message,
      category,
    });
  },
  verbose: (options: LogOptions) => {
    const { message, category } = options;

    loggerInstance.verbose({
      message,
      category,
    });
  },
  debug: (options: LogOptions) => {
    const { message, category } = options;

    loggerInstance.debug({
      message,
      category,
    });
  },
  silly: (options: LogOptions) => {
    const { message, category } = options;

    loggerInstance.silly({
      message,
      category,
    });
  },
};

import { WinstonModule } from "nest-winston";
import * as winston from "winston";

// cross-env로 node_env 설정
export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === "production" ? "http" : "silly",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint()
      ),
    }),
  ],
});

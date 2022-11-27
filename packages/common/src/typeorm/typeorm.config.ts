import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const getTypeormConfig = (entities): TypeOrmModuleOptions => {
  return {
    type: "mysql",
    host: process.env.DB_HOST || "127.0.0.1",
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "password",
    port: Number(process.env.DB_PORT) || 3306,
    database: process.env.DB_DATABASE || "develop",
    timezone: "Z",
    charset: "utf8_unicode_ci",
    synchronize: Boolean(process.env.DB_SYNC) || true,
    logging: Boolean(process.env.DB_LOGGING) || true, // 로그 레벨로도 가능
    entities: entities,
    migrations: [],
    subscribers: [],
  };
};

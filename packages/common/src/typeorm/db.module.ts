import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity, UserEntity } from "./entities";

@Module({})
export class DbModule {
  static register(): DynamicModule {
    return {
      module: DbModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => {
            return {
              type: "mysql",
              host: configService.get<string>("DB_HOST"),
              username: configService.get<string>("DB_USERNAME"),
              password: configService.get<string>("DB_PASSWORD"),
              port: configService.get<number>("DB_PORT"),
              database: configService.get<string>("DB_DATABASE"),
              timezone: "Z",
              charset: "utf8_unicode_ci",
              synchronize: configService.get<boolean>("DB_SYNC", true),
              logging: configService.get<boolean>("DB_LOGGING", true),
              entities: [PostEntity, UserEntity],
              migrations: [],
              subscribers: [],
            };
          },
          inject: [ConfigService],
        }),
      ],
    };
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { getTypeormConfig, PostEntity, UserEntity } from '@common/server';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`)],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(getTypeormConfig([UserEntity, PostEntity])),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

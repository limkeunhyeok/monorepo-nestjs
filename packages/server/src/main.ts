import { ApiDocsModule, ValidationPipe, winstonLogger } from '@common/server';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  });

  app.useGlobalPipes(new ValidationPipe());

  ApiDocsModule.register(app);

  await app.listen(3000);
}
bootstrap();

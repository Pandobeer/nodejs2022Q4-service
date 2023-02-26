import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

import { MyLogger } from './logger/logger.servise';

dotenv.config();

const PORT = process.env.PORT || 4000;


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // bufferLogs: true,
    // logger: levels
  });

  app.enableCors();

  const loggingService = (app.get(MyLogger));
  // app.useLogger
  // app.useLogger(new MyLogger());

  process.on('uncaughtException', (error) => {
    loggingService.logUncaughtException(error);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    loggingService.logUnhandledRejection(reason, promise);
  });

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('v1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);

  // throw new Error('Oops!');

}
bootstrap();;

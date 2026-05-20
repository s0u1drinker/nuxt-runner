import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { setupSwagger } from './common/utils/swagger.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: config.getOrThrow<string>('ALLOW_ORIGIN'),
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
    // allowedHeaders: ['Content-Type', 'Authorization', 'X-Device-Id', 'X-Device-Platform'],
  });

  setupSwagger(app);

  await app.listen(config.getOrThrow<number>('APPLICATION_PORT'));
}

void bootstrap();

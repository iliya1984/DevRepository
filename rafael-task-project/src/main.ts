import { LoggerService, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './core/globalExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const logger = app.get<LoggerService>('ILogger');

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter(logger));
  
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './app/config/swagger-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  const swagger = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, swagger);
  await app.listen(3000);
}
bootstrap();

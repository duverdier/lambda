import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './shared/passport/guards/jwt-auth.guard';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './shared/passport/exceptions/exception-filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  if (process.env.NODE_ENV !== 'production') {
    const options = new DocumentBuilder().setTitle('API').setDescription('').addTag('API').build();
    const doc = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/docs', app, doc);
  }
  const API_PORT = process.env.API_PORT || 3000;
  await app.listen(API_PORT);
}
bootstrap();

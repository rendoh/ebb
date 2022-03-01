import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PaginatedDto } from './pagination/dto/paginated.dto';
import { PaginationQueryDto } from './pagination/dto/pagination-query.dto';
import { ValidationErrorDto } from './validation-error/dto/validation-error.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Ebb Application API')
    .setDescription('API description')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [PaginatedDto, PaginationQueryDto, ValidationErrorDto],
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}
bootstrap();

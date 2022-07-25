import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService();

  //Middlewares
  app.enableCors({
    origin: [
      configService.get<string>('PROD_DOMAIN'),
      configService.get<string>('LOCAL_DOMAIN'),
      configService.get<string>('DEV_DOMAIN'),
    ],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .setTitle('Nest API')
    .setDescription('Nestjs typeorm and postgresql sample.')
    .setVersion('1.0')
    .addTag('app')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(configService.get<string>('PORT'));
  Logger.log(`Services running at PORT ${configService.get<string>('PORT')}`);
}
bootstrap();

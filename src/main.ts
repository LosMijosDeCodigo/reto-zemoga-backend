import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import fs = require('fs');
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const logger = new Logger('Bootstrap');
  const port = config.get<number>('HTTP_PORT') || 4000;

  //cors
  app.enableCors({
    origin: '*',
  });
  //limit payload
  app.use(bodyParser.json({ limit: '50mb' }));
  //version
  app.setGlobalPrefix('v1');
  //validations
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  //docs swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Docs reto zemoga')
    // .addBearerAuth()
    .setDescription('Documentacion de API generada por Nest Js')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/v1/swagger', app, document);
  // config info database in file ormconfig.json
  const configOrm = config.get('database.config');
  fs.writeFileSync('ormconfig.json', JSON.stringify(configOrm || {}, null, 4));

  //run app
  // const port = 4000;
  await app.listen(process.env.PORT || port);
  logger.log(`INICIA LA APP IN PORT ${port}`);
}
bootstrap();

import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { InvoiceModule } from './invoice/invoice.module';
import { PassportModule } from '@nestjs/passport';
import { PublicationModule } from './publication/publication.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import Joi = require('joi');
const configModuleTypeOrm = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) =>
    config.get<TypeOrmModuleOptions>('database.config'),
});
const validateEnviroment = Joi.object({
  API_KEY: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
});
const configModuleDefault = ConfigModule.forRoot({
  isGlobal: true,
  validationSchema: validateEnviroment,
  load: [databaseConfig, appConfig],
  envFilePath: '.env',
});

@Module({
  imports: [
    PassportModule,
    Logger,
    ConfigModule.forRoot(),
    configModuleTypeOrm,
    configModuleDefault,
    UserModule,
    InvoiceModule,
    MessageModule,
    PublicationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}

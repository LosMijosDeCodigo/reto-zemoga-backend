import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { InvoiceModule } from './invoice/invoice.module';
import databaseConfig from './config/database.config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { API_KEY, FOLDER_UPLOADS, TIME_EXPIRE_TOKEN } from './config/constants';
import { AuthService } from './auth/auth.service';
import { PublicationModule } from './publication/publication.module';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { AuthotizationMiddleware } from './common/middleware/authotization.middleware';
import { PublicationController } from './publication/publication.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    PassportModule,
    Logger,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<TypeOrmModuleOptions>('database.config'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: '.env',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule], // Missing this
      useFactory: (config: ConfigService) => ({
        signOptions: {
          expiresIn: config.get(TIME_EXPIRE_TOKEN) + 's',
        },
        secretOrPrivateKey: config.get(API_KEY),
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthModule,
    UserModule,
    InvoiceModule,
    MessageModule,
    PublicationModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthotizationMiddleware)
      .forRoutes(PublicationController, UserController);
  }
}

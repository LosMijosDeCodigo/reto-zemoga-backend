import { Module } from '@nestjs/common';
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
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    PassportModule,
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
    // MulterModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     dest: configService.get(FOLDER_UPLOADS),
    //   }),
    //   inject: [ConfigService],
    // }),
    MulterModule.register({
      dest: './publication-imagess',
    }),
    AuthModule,
    UserModule,
    InvoiceModule,
    MessageModule,
    PublicationModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}

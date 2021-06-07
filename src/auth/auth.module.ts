import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { API_KEY, TIME_EXPIRE_TOKEN } from 'src/config/constants';

@Module({
  imports: [
    UserModule,
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
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfigService],
})
export class AuthModule {}

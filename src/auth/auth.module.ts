import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { API_KEY, TIME_EXPIRE_TOKEN } from 'src/config/constants';

@Module({
  imports: [
    UserModule,
    PassportModule,
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
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

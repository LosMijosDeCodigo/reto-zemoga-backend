import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { API_KEY, TIME_EXPIRE_TOKEN } from 'src/config/constants';
import appConfig from 'src/config/app.config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Missing this
      inject: [appConfig.KEY],
      useFactory: (configService: ConfigType<typeof appConfig>) => {
        return {
          signOptions: {
            expiresIn: configService.jwtExpireIn + 's',
          },
          secretOrPrivateKey: configService.jwtSecret,
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

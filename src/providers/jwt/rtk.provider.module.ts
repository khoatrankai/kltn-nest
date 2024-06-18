// import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigModule } from 'src/config/jwt/config.module';
import { JwtConfigService } from 'src/config/jwt/config.service';
import { JwtRefreshTokenService } from 'src/services/jwt/rtk.service';

@Module({
  imports: [
    JwtModule.registerAsync({
        imports: [JwtConfigModule],
        inject: [JwtConfigService],
        useFactory: (configService: JwtConfigService) => ({
            secret: configService.refreshTokenSecret,
            signOptions: {
                expiresIn: configService.refreshTokenExpiresIn,
            },
        }),
    }),
  ],
  providers: [JwtRefreshTokenService,],
  exports: [JwtRefreshTokenService,],
  controllers: [],
})
export class JwtRefreshTokenServiceModule {}

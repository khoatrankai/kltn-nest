// import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from 'src/config/app/config.module';
import { AppConfigService } from 'src/config/app/config.service';
import { JwtConfigModule } from 'src/config/jwt/config.module';
import { JwtConfigService } from 'src/config/jwt/config.service';
import { JwtAccessTokenService } from 'src/services/jwt/atk.service';

@Module({
  imports: [
    JwtModule.registerAsync({
        imports: [JwtConfigModule, AppConfigModule],
        inject: [JwtConfigService, AppConfigService],
        useFactory: (configService: JwtConfigService, appConfigService: AppConfigService) => ({
            secret: configService.accessTokenSecret,
            signOptions: {
                expiresIn: appConfigService.mode === "development" ? "5h" : "1000h",
            },
        }),
    }),
  ],
  providers: [JwtAccessTokenService, JwtConfigService],
  exports: [JwtAccessTokenService, JwtConfigService],
  controllers: [],
})
export class JwtAccessTokenServiceModule {}

import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { JwtConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';

/**
 * Import and provide app configuration related classes.
 * 
 * @module
 */

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            envFilePath: ['.env.development', '.env.production', '.env.test', '.env.provision'],
            isGlobal: true,
            validationSchema: Joi.object({
                JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
                JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
                JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
                JWT_REFRESH_TOKEN_EXPIRES_IN: Joi.string().required(),
            }),
        })
    ],
    providers: [JwtConfigService],
    exports: [JwtConfigService],
})

export class JwtConfigModule {}
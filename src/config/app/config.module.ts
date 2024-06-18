import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { AppConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
                APP_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development'),
                APP_NAME: Joi.string().default('HBT'),
                APP_URL: Joi.string().default('http://localhost:8000'),
                APP_PORT: Joi.number().default(8000),
                APP_MODE: Joi.string().default('development'),
                FIREBASE_TYPE: Joi.string().default('service_account'),
                FIREBASE_PROJECT_ID: Joi.string().required(),
                FIREBASE_PRIVATE_KEY_ID: Joi.string().required(),
                FIREBASE_PRIVATE_KEY: Joi.string().required(),
                FIREBASE_CLIENT_EMAIL: Joi.string().required(),
                FIREBASE_CLIENT_ID: Joi.string().required(),
                FIREBASE_AUTH_URI: Joi.string().required(),
                FIREBASE_TOKEN_URI: Joi.string().required(),
                FIREBASE_AUTH_PROVIDER_X509_CERT_URL: Joi.string().required(),
                FIREBASE_CLIENT_X509_CERT_URL: Joi.string().required(),
            }),
        })
    ],
    providers: [ConfigService, AppConfigService],
    exports: [ConfigService, AppConfigService],
})

export class AppConfigModule {}
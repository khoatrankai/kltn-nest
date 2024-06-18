import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NodeMailerConfigService } from './config.service';
import configuration from './configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            envFilePath: ['.env.development', '.env.production', '.env.test', '.env.provision'],
            isGlobal: true,
            validationSchema: Joi.object({
                NODE_MAILER_HOST: Joi.string().required(),
                NODE_MAILER_PORT: Joi.number().required(),
                NODE_MAILER_SECURE: Joi.boolean().required(),
                NODE_MAILER_EMAIL: Joi.string().required(),
                NODE_MAILER_PASSWORD: Joi.string().required(),
                NODE_MAILER_NAME: Joi.string().required(),
            }),
        }),
    ],
    providers: [NodeMailerConfigService],
    exports: [NodeMailerConfigService],
})
export class NodeMailerConfigModule { }

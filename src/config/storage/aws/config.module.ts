import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { AWSConfigService } from './config.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            envFilePath: ['.env.development', '.env.production', '.env.test', '.env.provision'],
            isGlobal: true,
            validationSchema: Joi.object({
                AWS_ACCESS_KEY_ID: Joi.string().required(),
                AWS_SECRET_ACCESS_KEY: Joi.string().required(),
                AWS_REGION: Joi.string().required(),
                AWS_BUCKET_NAME: Joi.string().required().not(''),
                AWS_BUCKET_PREFIX_URL: Joi.string().required(),
            }),
        }),
    ],
    providers: [AWSConfigService],
    exports: [AWSConfigService],
})
export class AWSConfigModule { }

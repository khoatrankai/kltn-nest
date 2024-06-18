import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { BullConfigService } from './config.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            envFilePath: ['.env.development', '.env.production', '.env.test', '.env.provision'],
            isGlobal: true,
            validationSchema: Joi.object({
                BULL_REDIS_HOST: Joi.string().required(),
                BULL_REDIS_PORT: Joi.number().required(),
            }),
        }),
    ],
    providers: [BullConfigService],
    exports: [BullConfigService],
})
export class BullConfigModule { }

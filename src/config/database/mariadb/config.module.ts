import * as Joi from "joi";
import configuration from "./configuration";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { MariadbConfigService } from "./config.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            envFilePath: ['.env.development', '.env.production', '.env.test', '.env.provision'],
            isGlobal: true,
            validationSchema: Joi.object({
                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.number().required(),
                DB_USERNAME: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_DATABASE: Joi.string().required(),
            })
        })
    ],
    providers: [MariadbConfigService],
    exports: [MariadbConfigService],
})

export class MariadbConfigModule {}
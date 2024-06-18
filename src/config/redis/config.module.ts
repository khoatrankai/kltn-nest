// redis module (redis/config.module.ts):

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import redisConfig from "./configuration";
import { RedisConfigService } from "./config.service";

@Module({
    imports: [
        ConfigModule.forFeature(redisConfig),
    ],
    providers: [RedisConfigService],
    exports: [RedisConfigService],
})

export class RedisConfigModule {}



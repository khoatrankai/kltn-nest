// redis service (redis/config.service.ts):

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RedisConfigService {
    constructor(private redisConfig: ConfigService) {}

    get redis(): {
        host: string | undefined,
        port: number | undefined,
        // password: string | undefined,
    } | undefined {
        return {
            host: this.redisConfig.get<string>('redis.host'),
            port: Number(this.redisConfig.get<string>('redis.port')),
            // password: process.env.REDIS_PASSWORD,
        }
    }
}

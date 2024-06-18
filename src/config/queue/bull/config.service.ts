

/**
 * Bull configuration
 * 
 * @class
 */

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class BullConfigService {
    constructor(private bullConfig: ConfigService) {}

    get redis(): {
        host: string | undefined,
        port: number | undefined,
        // password: string | undefined,
    } | undefined {
        return {
            host: this.bullConfig.get<string>('bull.redis.host'),
            port: Number(this.bullConfig.get<string>('bull.redis.port')),
            // password: process.env.REDIS_PASSWORD,
        }
    }
}
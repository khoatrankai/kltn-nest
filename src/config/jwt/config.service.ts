
/**
 * @description JWT Config Service
 * 
 * @class
 */

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtConfigService {
    constructor(
        private readonly jwtConfigService: ConfigService,
    ) {}

    get accessTokenSecret(): string | undefined {
        return this.jwtConfigService.get<string>('jwt.accessTokenSecret')
    }

    get refreshTokenSecret(): string | undefined {
        return this.jwtConfigService.get<string>('jwt.refreshTokenSecret')
    }

    get accessTokenExpiresIn(): string | undefined {
        return this.jwtConfigService.get<string>('jwt.accessTokenExpiresIn')
    }

    get refreshTokenExpiresIn(): string | undefined {
        return this.jwtConfigService.get<string>('jwt.refreshTokenExpiresIn')
    }

}
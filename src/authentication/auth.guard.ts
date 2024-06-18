// import { JwtRefreshTokenService } from 'src/services/jwt/rtk.service';

/**
 * AuthGuard is a service that implements CanActivate interface.
 * It has a single method canActivate() that returns a boolean or a promise that resolves to a boolean.
 * If it returns true, the route is activated (allowed to proceed),
 * otherwise if it returns false, the route is blocked.
 * 
 * @class
 */

import { CanActivate, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtAccessTokenService } from "src/services/jwt/atk.service";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtAccessTokenService: JwtAccessTokenService,
        // private readonly jwtRefreshTokenService: JwtRefreshTokenService,pm2
    ) {}

    async canActivate(context: any): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            if (!request.headers.authorization) {
                throw new UnauthorizedException();
            }
            Logger.log('AuthGuard: canActivate');
            request.user = await this.validateToken(request.headers.authorization);

            return true;
        } catch (error) {
            throw error;
        }
    }

    async validateToken(token: string) {
        try {
            return await this.jwtAccessTokenService.validateToken(token);
        } catch (error) {
            throw error;
        }
    }
}
// import { JwtRefreshTokenService } from 'src/services/jwt/rtk.service';

/**
 * AuthGuard is a service that implements CanActivate interface.
 * It has a single method canActivate() that returns a boolean or a promise that resolves to a boolean.
 * If it returns true, the route is activated (allowed to proceed),
 * otherwise if it returns false, the route is blocked.
 * 
 * @class
 */

import { CanActivate, Injectable, Logger } from "@nestjs/common";
import { JwtPayload } from "src/common/interfaces/jwtPayload.interface";
import { JwtAccessTokenService } from "src/services/jwt/atk.service";


@Injectable()
export class AuthNotRequiredGuard implements CanActivate {
    constructor(
        private readonly jwtAccessTokenService: JwtAccessTokenService,
        // private readonly jwtRefreshTokenService: JwtRefreshTokenService,
    ) {}

    async canActivate(context: any): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if (!request.headers.authorization) {
            return true;
        }
        const token = request.headers.authorization;
        try {
            const user =  await this.validateToken(token);
            // Logger.log('AuthNotRequiredGuard: true', user);
            context.switchToHttp().getRequest().user = user;
            return true;
        } catch (error) {
            throw error;
        }
    }

    async validateToken(auth: string): Promise<JwtPayload> {
        Logger.log('AuthNotRequiredGuard: validateToken');
        try {
            return await this.jwtAccessTokenService.validateToken(auth);
        } catch (error) {
            throw error;
        }
    }
}
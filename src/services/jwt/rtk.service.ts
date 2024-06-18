
/**
 * @description JWT Refresh Token Service
 * @todo
 * - Create a refresh token service that will handle the refresh token logic.
 * - The refresh token service will have a single method that will generate a new access token.
 * 
 * @class
 */

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtRefreshTokenService {
    constructor(
        private readonly jwtRTKService: JwtService,
    ) {}

    async generateRefreshToken(payload: any) {
        return this.jwtRTKService.signAsync(payload);
    }
    
    async parseRefreshToken(token: string) {
        return this.jwtRTKService.decode(token);
    }

    async validateToken(auth: string) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new Error('Invalid token');
        }
        const token = auth.split(' ')[1];
        try {
            return await this.jwtRTKService.verifyAsync(token);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}

/**
 * @description JWT Access Token Service
 * @todo
 * - Create a Access token service that will handle the Access token logic.
 * - The Access token service will have a single method that will generate a new access token.
 * 
 * @class
 */

import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "src/common/interfaces/jwtPayload.interface";

@Injectable()
export class JwtAccessTokenService {
    constructor(
        private readonly jwtATKService: JwtService,
    ) {}

    async generateAccessToken(payload: JwtPayload) {
        return this.jwtATKService.signAsync(payload);
    }
    
    async parseAccessToken(token: string) {
        return this.jwtATKService.decode(token);
    }

    async validateToken(auth: string): Promise<JwtPayload> {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new UnauthorizedException();
        }
        const token = auth.split(' ')[1];
        try {
            await this.jwtATKService.verifyAsync(token)
            return this.jwtATKService.decode(token) as JwtPayload;
        } catch (error) {

            if (error instanceof Error) {
                switch (error.message) {
                    case 'invalid token':
                        // throw new ForbiddenException('Invalid token');
                    case 'jwt malformed':
                        // throw new 
                    case 'invalid signature':
                    case 'jwt signature is required':
                    case 'invalid algorithm':
                        throw new UnauthorizedException();
                    case 'jwt expired':
                        throw new ForbiddenException('Token expired');
                    case 'jwt not active':
                        throw new ForbiddenException('Token not active');
                    default:
                        throw new UnauthorizedException('Invalid token');
                }
            }
            throw error;

        }
    }
}
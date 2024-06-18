import { JwtAccessTokenService } from 'src/services/jwt/atk.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SignInEmailDto } from "./dto/auth.dto";
import { UserService } from 'src/models/user-model/users/users.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        // private authService: AuthService,
        // private bullMailService: BullMailService,
        private usersService: UserService,
        private readonly jwtAccessTokenService: JwtAccessTokenService,
    ) { }
    
    @HttpCode(HttpStatus.OK)
    @Post('email')
    async signIn(@Body() signInEmail: SignInEmailDto): Promise<any> {
        // this.bullMailService.sendMail(signInEmail.email || '');

        const user = await this.usersService.findByEmail(signInEmail.email);

        if (!user) {
            return {
                message: 'User not found',
            };
        }

        return this.jwtAccessTokenService.generateAccessToken({ 
            id: user.id,
            role: user.role || 0,
         });
    }
}
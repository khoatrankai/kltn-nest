import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
import ip from 'ip';
import { ApiTags } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

@ApiTags('Forgot Password')
@Controller('forgot-password')
export class ForgotPasswordController {
    constructor(
        private readonly forgotPasswordService: ForgotPasswordService,
    ) { }

    @Post()
    async create(@Body() createForgotPasswordDto: CreateForgotPasswordDto) {
        try {
            createForgotPasswordDto.ip = ip.address();
            createForgotPasswordDto.expiresAt = new Date(Date.now() + 2 * 60 * 1000);
            createForgotPasswordDto.token = uuidv4();
            createForgotPasswordDto.status = 0;
        
            await this.forgotPasswordService.create(createForgotPasswordDto);

            return {
                status: HttpStatus.CREATED,
                message: 'Token created successfully',
            };
        } catch (error) {
            throw error;
        }
    }

    @Get('/:token')
    async getUID(@Param('token') params: { token: string } , @Res() res: any) {
        try {
            const ipUser = ip.address();
            const data = await this.forgotPasswordService.getUIDService(params , ipUser);

            if (data) {
                res.redirect(data.url);
            }

        } catch (error) {
            throw error;
        }
    }
}

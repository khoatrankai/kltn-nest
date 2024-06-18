import { BadRequestException, Body, Controller, Post, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/authentication/auth.guard";
import { RoleGuard } from "src/authentication/role.guard";
import { Roles } from "src/authentication/roles.decorator";
import { Role } from "src/common/enum";
import { AdminService } from "./admin.service";
import { AdsMailOptionsDto } from "./dto/ads-mail-options.dto";
import { CustomRequest } from "src/common/interfaces/customRequest.interface";
import { Response } from "express";


@Controller('admin')
export class AdminController {

    constructor(
        private readonly adminService: AdminService
    ) { }

    @Roles(Role.ADMIN, Role.WORKER)
    @UseGuards(AuthGuard, RoleGuard)
    @Post('send-mail')
    async sendMail(@Body() data: AdsMailOptionsDto[],
     @Req() req: CustomRequest, @Res() res: Response) {
        try {
            if (!req.user) {
                throw new UnauthorizedException('Unauthorized');
            }
            
            // max 10 mail in 1 request
            if (data.length > 200) {
                throw new BadRequestException('Max 10 mail in 1 request');
            }
            
            await this.adminService.sendAdsMail(data, req.user.id);

            return res.status(200).json({
                statusCode: 200,
                message: 'Send mail successfully'
            });

        } catch (error) {
            throw new BadRequestException('Send mail failed');
        }
    }
}
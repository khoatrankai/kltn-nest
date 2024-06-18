import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { DeleteBannerDto } from './dto/delete-banner.dto';
import { BannersService } from './banners.service';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enum';
import { AuthGuard } from 'src/authentication/auth.guard';
import { RoleGuard } from 'src/authentication/role.guard';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Banner')
@Controller('banners')
export class BannersController {

    constructor(private readonly bannersService: BannersService) {}
    //Delete Banners 
    @Post('delete')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    deleteBanner(@Body() deleteBanner: DeleteBannerDto) {
        return this.bannersService.deleteBannerService(deleteBanner);
    }
}

import { Controller, Post, Body, BadRequestException, UseGuards, Req, HttpStatus, Get, Query } from '@nestjs/common';
import { ViewProfilesService } from './view_profiles.service';
import { CreateViewProfileDto } from './dto/create-view_profile.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';

@Controller('view-profiles')
@ApiTags('View Profiles')
export class ViewProfilesController {
  constructor(private readonly viewProfilesService: ViewProfilesService) { }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(@Body() createViewProfileDto: CreateViewProfileDto, @Req() req: CustomRequest) {
    try {

      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      createViewProfileDto.recruitId = accountId;

      const total = await this.viewProfilesService.create(createViewProfileDto);

      return {
        status: HttpStatus.OK,
        total
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error');
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
  })
  async findAll(@Req() req: CustomRequest, @Query('page') page: number, @Query('limit') limit: number){
    try {
      const accountId = req.user?.id;
      const pageInt = parseInt(page.toString()) ? parseInt(page.toString()) : 0;
      const limitInt = parseInt(limit.toString()) ? parseInt(limit.toString()) : 10;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      return {
        status: HttpStatus.OK,
        data: await this.viewProfilesService.findAll(accountId, pageInt, limitInt)
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error');
    }
  }
}

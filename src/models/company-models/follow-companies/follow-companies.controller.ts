import { Controller, Get, Post, Body, UseGuards, Req, BadRequestException, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { FollowCompaniesService } from './follow-companies.service';
import { CreateFollowCompanyDto } from './dto/create-follow-company.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { FollowCompanyInterceptor } from './interceptor/follow-companies.interceptor';


@ApiTags('Follow Companies')
@Controller('follow-companies')
export class FollowCompaniesController {
  constructor(private readonly followCompaniesService: FollowCompaniesService) { }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(@Body() createFollowCompanyDto: CreateFollowCompanyDto, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account id not found');
      }

      createFollowCompanyDto.accountId = accountId;

      return await this.followCompaniesService.create(createFollowCompanyDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor, FollowCompanyInterceptor)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async findAll(@Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;
      if (!accountId) {
        throw new BadRequestException('Account id not found');
      }

      return await this.followCompaniesService.findAll(accountId);
    } catch (error) {
      throw error;
    }
  }
}

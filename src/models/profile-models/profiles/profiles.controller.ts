import {
  Controller,
  Get,
  Body,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  UseGuards,
  Put,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProfileDetailInterceptor } from './interceptor/profile-detail.interceptor';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { AuthGuard } from 'src/authentication/auth.guard';
import { ProfileDetailCandidateInterceptor } from './interceptor/profile-detail-candidate.interceptor';
import { PostOfMonthRecruiterInterceptor } from './interceptor/post-recruiter-month.interceptor';


@ApiTags('profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) { }

  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor, ProfileDetailInterceptor)
  @UseGuards(AuthGuard)
  @Get('me')
  async findOne(@Req() req: CustomRequest) {
    const id = req.user?.id;

    if (!id) {
      return null;
    }
    const profile = await this.profilesService.findOne(id);

    return profile;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('recruiter/analyst/viewd')
  async getRecruiterViewdProfiles(@Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account not found');
      }

      const data = await this.profilesService.getRecruiterPostedProfiles(accountId);

      return {
        status: HttpStatus.OK,
        message: 'Get recruiter posted profiles successfully',
        data,
      };
    } catch (error) {
      throw error;
    }
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard)
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
  @UseInterceptors(ClassSerializerInterceptor, PostOfMonthRecruiterInterceptor)
  @Get('recruiter/analyst/viewd/month/:month')
  async getRecruiterViewdProfilesByMonth(@Req() req: CustomRequest, @Param('month') month: string) {
    try {
      const accountId = req.user?.id;
      const { page, limit } = req.query;

      if (!accountId) {
        throw new BadRequestException('Account not found');
      }

      return await this.profilesService.getRecruiterViewdProfilesByMonth(accountId, month, page ? +page : 0, limit ? +limit : 10);
    } catch (error) {
      throw error;
    }
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('recruiter/analyst/applications')
  async getRecruiterApplications(@Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account not found');
      }

      const data = await this.profilesService.getRecruiterApplicationsFullMonth(accountId);

      return {
        status: HttpStatus.OK,
        message: 'Get recruiter applications successfully',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
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
  @Get('recruiter/analyst/applications/month/:month')
  async getRecruiterApplicationsByMonth(@Req() req: CustomRequest, @Param('month') month: string) {
    try {
      const accountId = req.user?.id;
      const { page, limit } = req.query;

      if (!accountId) {
        throw new BadRequestException('Account not found');
      }

      return await this.profilesService.getRecruiterApplicationsByMonth(accountId, month, page ? +page : 0, limit ? +limit : 10);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('recruiter/analyst/percents')
  async getRecruiterPercents(@Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account not found');
      }

      const data = await this.profilesService.getRecruiterPercents(accountId);

      return {
        status: HttpStatus.OK,
        message: 'Get recruiter percents successfully',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @ApiQuery({
    name: 'year',
    required: false,
    type: Number,
  })
  @UseGuards(AuthGuard)
  @Get('recruiter/analyst/percents/app')
  async getRecruiterPercentsApp(@Req() reqCustom: CustomRequest, @Req() req: any){
    try {
      const accountId = reqCustom.user?.id;
      const { year } = req.query;

      if (!accountId) {
        throw new BadRequestException('Account not found');
      }

      const data = await this.profilesService.getRecruiterPercentsApp(accountId, year ? +year : new Date().getFullYear());

      return {
        status: HttpStatus.OK,
        message: 'Get recruiter percents app successfully',
        data,
      };
    } catch (error) {
      throw error;
    }
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/analytics')
  async getAnalytics(@Req() req: CustomRequest) {
    try {

      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account not found');
      }

      const analytics = await this.profilesService.getAnalytics(accountId);
      return {
        status: HttpStatus.OK,
        message: 'Get analytics successfully',
        data: analytics,
      };
    } catch (error) {
      throw new BadRequestException('Error getting analytics');
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor, ProfileDetailCandidateInterceptor)
  async getProfileById(@Param('id') id: string, @Req() req: CustomRequest) {
    try {

      const accountId = req.user?.id;
      const unlock = req.unlock ? req.unlock : false;

      if (!accountId) {
        throw new BadRequestException('Account not found');
      }

      return await this.profilesService.getProfileById(id, accountId, unlock.toString());
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error getting profile')
    }
  }

  @Put('job')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async update(
    @Body() updateProfileDto: UpdateProfileDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Something went wrong');
      }

      updateProfileDto.accountId = accountId;

      await this.profilesService.update(updateProfileDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Update profile successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Something went wrong');
    }
  }
}

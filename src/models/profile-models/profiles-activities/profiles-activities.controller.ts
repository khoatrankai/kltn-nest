import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
  HttpStatus,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ProfilesActivitiesService } from './profiles-activities.service';
import { CreateProfilesActivityDto } from './dto/create-profiles-activity.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { UpdateProfilesActivityDto } from './dto/update-profiles-activity.dto';
import { DeleteProfilesActivityDto } from './dto/delete-profile-activity.dto';

@Controller('profiles-activities')
@ApiTags('Profiles Activities')
export class ProfilesActivitiesController {
  constructor(
    private readonly profilesActivitiesService: ProfilesActivitiesService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(
    @Body() createProfilesActivityDto: CreateProfilesActivityDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new BadRequestException('User not found');
      }

      createProfilesActivityDto.accountId = id;

      return {
        statusCode: HttpStatus.CREATED,
        data: await this.profilesActivitiesService.create(
          createProfilesActivityDto,
        ),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error creating profile activity');
    }
  }

  
  @Delete('remove')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async removeAll(@Req() req: CustomRequest, @Body() data: DeleteProfilesActivityDto) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      data.accountId = accountId;

      const result = await this.profilesActivitiesService.removeAll(data);

      return {
        statusCode: HttpStatus.OK,
        message: `${result.affected} profile activities deleted successfully`,
        data: result.affected,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error deleting profile activity');
    }
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfilesActivityDto: UpdateProfilesActivityDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      updateProfilesActivityDto.accountId = accountId;

      await this.profilesActivitiesService.update(
        id,
        updateProfilesActivityDto,
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'Profile activity updated successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Profile activity not found');
    }
  }
}

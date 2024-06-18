import {
  Controller,
  Post,
  Body,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { ProfilesHobbiesService } from './profiles_hobbies.service';
import { CreateProfilesHobbyDto } from './dto/create-profiles_hobby.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('profiles-hobbies')
@ApiTags('Profiles Hobbies')
export class ProfilesHobbiesController {
  constructor(
    private readonly profilesHobbiesService: ProfilesHobbiesService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async create(
    @Body() createProfilesHobbyDto: CreateProfilesHobbyDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new BadRequestException('User not found');
      }

      createProfilesHobbyDto.accountId = id;

      return await this.profilesHobbiesService.createOrUpdate(
        createProfilesHobbyDto,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error creating profile hobby');
    }
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async remove(@Req() req: CustomRequest) {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new BadRequestException('User not found');
      }

      await this.profilesHobbiesService.remove(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Profile hobby deleted successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error deleting profile hobby');
    }
  }
}

import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpStatus,
  BadRequestException,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ProfilesIntershipsService } from './profiles-interships.service';
import { CreateProfilesIntershipDto } from './dto/create-profiles-intership.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateProfilesIntershipDto } from './dto/update-profiles-intership.dto';
import { DeleteProfilesIntershipDto } from './dto/delete-profile-intership.dto';

@Controller('profiles-interships')
@ApiTags('Profiles Interships')
export class ProfilesIntershipsController {
  constructor(
    private readonly profilesIntershipsService: ProfilesIntershipsService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async create(
    @Body() createProfilesIntershipDto: CreateProfilesIntershipDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new BadRequestException('User not found');
      }

      createProfilesIntershipDto.accountId = id;

      const data = await this.profilesIntershipsService.create(
        createProfilesIntershipDto,
      )

      return {
        statusCode: HttpStatus.CREATED,
        data: data,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error creating profile intership');
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfilesIntershipDto: UpdateProfilesIntershipDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      updateProfilesIntershipDto.accountId = accountId;

      await this.profilesIntershipsService.update(
        id,
        updateProfilesIntershipDto,
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'Profile intership updated successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Profile intership not found');
    }
  }

  @Delete('remove')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async removeAll(@Body() data: DeleteProfilesIntershipDto, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      data.accountId = accountId;

      const result = await this.profilesIntershipsService.removeAll(data);

      return {
        statusCode: HttpStatus.OK,
        message: `${result.affected} profile intership deleted successfully`,
        data: result.affected,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error deleting profile intership');
    }
  }
}

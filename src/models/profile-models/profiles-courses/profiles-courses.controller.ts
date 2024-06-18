import {
  Controller,
  Post,
  Body,
  Delete,
  UseGuards,
  BadRequestException,
  Req,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ProfilesCoursesService } from './profiles-courses.service';
import { CreateProfilesCourseDto } from './dto/create-profiles-course.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { DeleteProfilesCourseDto } from './dto/delete-profile-course.dto';
import { UpdateProfilesCourseDto } from './dto/update-profiles-course.dto';

@Controller('profiles-courses')
@ApiTags('Profiles Courses')
export class ProfilesCoursesController {
  constructor(
    private readonly profilesCoursesService: ProfilesCoursesService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(
    @Body() createProfilesCourseDto: CreateProfilesCourseDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new BadRequestException('User not found');
      }
      
      createProfilesCourseDto.accountId = id;
      const data = await this.profilesCoursesService.create(createProfilesCourseDto)
      
      return {
        statusCode: HttpStatus.CREATED,
        data: data,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error creating profile course');
    }
  }

  @Delete('remove')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async removeAll(@Body() data: DeleteProfilesCourseDto, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      data.accountId = accountId;

      const result = await this.profilesCoursesService.removeAll(data);

      return {
        statusCode: HttpStatus.OK,
        message: `${result.affected} profile courses deleted successfully`,
        data: result.affected,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error delete profile course');
    }
  }
  
  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProfilesCourseDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      dto.accountId = accountId;

      await this.profilesCoursesService.update(
        id,
        dto,
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'Profile course updated successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Profile course not found');
    }
  }
}

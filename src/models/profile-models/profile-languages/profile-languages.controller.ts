import {
  Controller,
  Post,
  Body,
  Delete,
  BadRequestException,
  Req,
  HttpStatus,
  UseGuards,
  Put,
  Param,
} from '@nestjs/common';
import { ProfileLanguagesService } from './profile-languages.service';
import { CreateProfileLanguageDto } from './dto/create-profile-language.dto';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { AuthGuard } from 'src/authentication/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeleteProfilesLanguageDto } from './dto/delete-profile-language.dto';
import { UpdateProfileLanguageDto } from './dto/update-profile-language.dto';

@Controller('profile-languages')
@ApiTags('Profile Languages')
export class ProfileLanguagesController {
  constructor(
    private readonly profileLanguagesService: ProfileLanguagesService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(
    @Body() createProfileLanguageDto: CreateProfileLanguageDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const id = req.user?.id;
      if (!id) {
        throw new BadRequestException('User not found');
      }

      createProfileLanguageDto.accountId = id;

      return {
        statusCode: HttpStatus.CREATED,    
        message: 'Add profile language successfully',
        data: await this.profileLanguagesService.create(
          createProfileLanguageDto,
        ),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error creating profile languages');
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete('remove')
  async removeAll(
    @Body() data: DeleteProfilesLanguageDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;
      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      data.accountId = accountId;

      const result = await this.profileLanguagesService.removeAll(data);

      return {
        statusCode: HttpStatus.OK,
        message: `${result.affected} profile language deleted successfully`,
        data: result.affected,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error delete profile language');
    }
  }

  @Put(":id")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Req() req: CustomRequest, @Body() dto : UpdateProfileLanguageDto) {
    try {
      
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found')
      }

      dto.id = +id
      dto.accountId = accountId

      await this.profileLanguagesService.update(dto)

      return {
        statusCode: HttpStatus.OK,
        message: 'Update profile language successfully'
      }

    } catch (error) {
      if (error instanceof Error) {
          throw new BadRequestException(error.message); 
      }
      throw new BadRequestException('Error updating profile language')
    }
  }
}

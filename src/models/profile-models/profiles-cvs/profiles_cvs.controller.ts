import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
  Req,
  BadRequestException,
  UseInterceptors,
  // FileTypeValidator,
  HttpStatus,
  Delete,
  ClassSerializerInterceptor,
  UploadedFiles,
} from '@nestjs/common';
import { ProfilesCvsService } from './profiles_cvs.service';
import { CreateProfilesCvDto } from './dto/create-profiles_cv.dto';
import { UpdateProfilesCvDto } from './dto/update-profiles_cv.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
// import { PdfValidator } from 'src/common/decorators/validation/pdf-validator/pdf.validator';
import { fromBuffer } from 'pdf2pic';
import { v4 as uuidv4 } from 'uuid';
import { DeleteProfilesCvDto } from './dto/delete-profiles_cv.dto';
import { UpdateProfileCvsTemplate } from './dto/update-profiles_cv-templafte';

@ApiTags('Profiles Cvs')
@Controller('profiles-cvs')
export class ProfilesCvsController {
  constructor(private readonly profilesCvsService: ProfilesCvsService) { }

  @Post()
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseInterceptors(
    ClassSerializerInterceptor,
    FileFieldsInterceptor(
      [
        { name: 'file', maxCount: 1 },
        { name: 'images', maxCount: 5 },
      ],
      {
        limits: {
          fileSize: 1024 * 1024 * 6,
        },
      },
    ),
  )
  async create(
    @Body() createProfilesCvDto: CreateProfilesCvDto,
    @Req() req: CustomRequest,
    @UploadedFiles() files: { file: Express.Multer.File[], images: Express.Multer.File[] },
  ) {
    try {
      const path = `${Date.now()}-${uuidv4()}`;
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }
      createProfilesCvDto.file = files.file[0];
      createProfilesCvDto.accountId = accountId;
      createProfilesCvDto.path = path + '.pdf';

      if (createProfilesCvDto.type === 0) {
        const image = fromBuffer(files.file[0].buffer, {
          density: 100,
          format: 'jpg',
          quality: 70,
          width: 210 * 2,
          height: 297 * 2,
        });

        const imageBuffer = await image
          .bulk(1, { responseType: 'buffer' })
          .then((result) => {
            return result.map((page) => {
              return page.buffer ?? Buffer.alloc(0);
            });
          });
        createProfilesCvDto.image = path + '.jpg';
        createProfilesCvDto.imageBuffer = imageBuffer[0];
      }

      else {
        if (!files.images) {
          throw new BadRequestException('Images not found');
        }
        createProfilesCvDto.image = path + '.jpg';
        createProfilesCvDto.imageBuffer = files.images[0].buffer;
      }


      return {
        statusCode: HttpStatus.CREATED,
        data: await this.profilesCvsService.create(createProfilesCvDto),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error create profile cv');
    }
  }

  @Put('template')
  @UseGuards(AuthGuard)
  @ApiQuery({ name: 'cvIndex', type: 'number' })
  @ApiBearerAuth()
  async updateTemplate(
    @Body() updateProfilesCvDto: UpdateProfileCvsTemplate,
    @Req() req: CustomRequest,
    @Req() reqCv: any,
  ) {
    try {
      const accoundId = req.user?.id;
      const { cvIndex } = reqCv.query;

      if (!accoundId) {
        throw new BadRequestException('User not found');
      }

      updateProfilesCvDto.accountId = accoundId;
      updateProfilesCvDto.cvIndex = cvIndex;

      const data = await this.profilesCvsService.updateTemplate(
        updateProfilesCvDto,
      );

      return {
        statusCode: HttpStatus.OK,
        message: `${data} update template profile cv successfully`,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error update template profile cv');
    }
  }

  // @Put('hide')
  // @UseGuards(AuthGuard)
  // @ApiBearerAuth()
  // async hide(@Req() req: CustomRequest) {
  //   try {
  //     const accoundId = req.user?.id;

  //     if (!accoundId) {
  //       throw new BadRequestException('User not found');
  //     }

  //     const data = await this.profilesCvsService.hideAll(accoundId);

  //     return {
  //       statusCode: HttpStatus.OK,
  //       message: `${data} Hide profile cv successfully`,
  //     };
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       throw new BadRequestException(error.message);
  //     }
  //     throw new BadRequestException('Error hide profile cv');
  //   }
  // }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateProfilesCvDto: UpdateProfilesCvDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accoundId = req.user?.id;

      if (!accoundId) {
        throw new BadRequestException('User not found');
      }

      updateProfilesCvDto.accountId = accoundId;
      updateProfilesCvDto.id = +id;

      const data = await this.profilesCvsService.update(updateProfilesCvDto);

      return {
        statusCode: HttpStatus.OK,
        message: data === 2 ? 'Show profile cv successfully' : 'Hide profile cv successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error update profile cv');
    }
  }

  @Delete()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async delete(@Req() req: CustomRequest, @Body() dto: DeleteProfilesCvDto) {
    try {
      const accoundId = req.user?.id;

      if (!accoundId) {
        throw new BadRequestException('User not found');
      }

      dto.accountId = accoundId;

      const result = await this.profilesCvsService.delete(dto);

      return {
        statusCode: HttpStatus.OK,
        message: `${result} profile cv deleted`,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error delete profile cv');
    }
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  Req,
  UploadedFiles,
  BadRequestException,
  HttpStatus,
  ClassSerializerInterceptor,
  Delete,
} from '@nestjs/common';
import { CvInformationService } from './cv-information.service';
import { CreateCvInformationDto } from './dto/create-cv-information.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { ApiConsumes, ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { ResizeImageResult } from 'src/common/helper/transform/resize-image';
import { CVmagesPipe } from './interceptor/image.interceptor';
import { CvInformationInterceptor } from './interceptor/cv-information.interceptor';
import { DeleteCvInformationDto } from './dto/delete-cv-information';
import { UploadWordDto } from './dto/upload-word.dto';
import * as mammoth from 'mammoth';

@ApiTags('CV Information')
@Controller('cv-information')
export class CvInformationController {
  constructor(private readonly cvInformationService: CvInformationService) { }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 1 }]))
  async create(
    @Body() createCvInformationDto: CreateCvInformationDto,
    @Req() req: CustomRequest,
    @UploadedFiles(CVmagesPipe)
    listImages: ResizeImageResult[] | undefined,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account id is required');
      }

      if (listImages && listImages.length > 0) {
        createCvInformationDto.images = listImages;
      }

      createCvInformationDto.accountId = accountId;

      return {
        statusCode: HttpStatus.CREATED,
        data: await this.cvInformationService.create(createCvInformationDto),
      };
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Create cv information failed');
    }
  }

  @Post('read')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'file', maxCount: 1 }],
      // new ImageAndPdfInterceptor().createMulterOptions() as any
    ),
  )
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async readWordFile(
    @UploadedFiles() listFiles: { file?: Express.Multer.File[] },
    @Body() updateWord: UploadWordDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account id is required');
      }

      if (listFiles.file && listFiles.file.length > 0) {
        updateWord.file = listFiles.file[0];
      }


      if (updateWord.file && updateWord.file.buffer) {
        const result = await mammoth.extractRawText({ buffer: updateWord.file.buffer });
        const data = await this.cvInformationService.readWordFileFromBuffer(result);

        return {
          statusCode: HttpStatus.OK,
          data: {
            info_project: data.projects,
            info_skill: data.skills,
            info_experience: data.experiences,
            info_study: data.educations,
            info_person: data.information,
          },
        };
      } else {
        console.error('No file buffer found or buffer is invalid.');
        throw new BadRequestException('No file buffer found or buffer is invalid.');
      }

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Read word file failed');
    }
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiQuery({ name: 'cvIndex', required: false })
  @UseInterceptors(ClassSerializerInterceptor, CvInformationInterceptor)
  async findAll(@Req() req: CustomRequest, @Req() reqCv: {
    query: {
      cvIndex: string;
    };
  }) {
    try {
      const accountId = req.user?.id;
      const cvIndex = reqCv.query.cvIndex;

      if (!accountId) {
        throw new BadRequestException('Account id is required');
      }

      return await this.cvInformationService.findAll(accountId, isNaN(+cvIndex) ? -1 : +cvIndex);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Update cv information failed');
    }
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async deteleCvInformation(
    @Body() dto: DeleteCvInformationDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account id is required');
      }

      const data = await this.cvInformationService.deleteCvInformation(
        accountId,
        dto.cvindex,
      );
      return {
        statusCode: HttpStatus.OK,
        message: `${data} Delete cv information successfully`,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Update cv information failed');
    }
  }
}

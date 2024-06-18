import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  BadRequestException,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  Delete,
} from '@nestjs/common';
import { CvExtraInformationService } from './cv-extra-information.service';
import { AuthGuard } from 'src/authentication/auth.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ArrayCreateCvExtraInformationDto } from './dto/array-create-extra-information';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { CvExtraInformationInterceptor } from './interceptor/cv-extra-information.interceptor';
import { DeleteMoreCvExtraInformationDto } from './dto/delete-cv-extra-information.dto';

@ApiTags('CV Extra Information')
@Controller('cv-extra-information')
export class CvExtraInformationController {
  constructor(
    private readonly cvExtraInformationService: CvExtraInformationService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(
    @Body() createCvExtraInformationDto: ArrayCreateCvExtraInformationDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account Id is required');
      }

      createCvExtraInformationDto.accountId = accountId;

      return {
        statusCode: HttpStatus.CREATED,
        data: await this.cvExtraInformationService.create(
          createCvExtraInformationDto,
        ),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Internal Server Error');
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'cvIndex', required: false })
  @UseInterceptors(ClassSerializerInterceptor, CvExtraInformationInterceptor)
  async findAll(
    @Req() req: CustomRequest,
    @Req()
    reqCv: {
      query: {
        cvIndex: string;
      };
    },
  ) {
    try {
      const accountId = req.user?.id;
      const cvIndex = reqCv.query.cvIndex;

      if (!accountId) {
        throw new BadRequestException('Account Id is required');
      }

      return await this.cvExtraInformationService.findAll(
        accountId,
        isNaN(+cvIndex) ? -1 : +cvIndex,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Internal Server Error');
    }
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async deleteMoreCvExtraInformation(
    @Req() req: CustomRequest,
    @Body() dto: DeleteMoreCvExtraInformationDto,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account id is required');
      }

      const data =
        await this.cvExtraInformationService.deleteMoreCvExtraInformation(
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
      throw new Error('Delete cv information failed');
    }
  }
}

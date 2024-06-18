import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  HttpStatus,
  BadRequestException,
  UseInterceptors,
  ClassSerializerInterceptor,
  Delete,
} from '@nestjs/common';
import { CvProjectService } from './cv-project.service';
import { AuthGuard } from 'src/authentication/auth.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { ArrayCreateCvProjectDto } from './dto/array-create-cv-project.dto';
import { CvProjectInterceptor } from './interceptor/cv-project.interceptor';
import { DeleteCvProjectDto } from './dto/delete-cv-project.dto';

@ApiTags('CV Project')
@Controller('cv-project')
export class CvProjectController {
  constructor(private readonly cvProjectService: CvProjectService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(
    @Body() createCvProjectDto: ArrayCreateCvProjectDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account id is required');
      }
      
      createCvProjectDto.accountId = accountId;
      return {
        statusCode: HttpStatus.CREATED,
        data: await this.cvProjectService.create(createCvProjectDto),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error while creating cvProject');
    }
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiQuery({ name: 'cvIndex', required: false })
  @UseInterceptors(ClassSerializerInterceptor, CvProjectInterceptor)
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
      return await this.cvProjectService.findAll(accountId, isNaN(+cvIndex) ? -1 : +cvIndex);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error while fetching cvProject');
    }
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async deleteCvProject(
    @Req() req: CustomRequest,
    @Body() dto: DeleteCvProjectDto,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account id is required');
      }

      const data = await this.cvProjectService.deleteCvProject(
        accountId,
        dto.cvindex,
      );

      return {
        statusCode: HttpStatus.OK,
        message: `${data} CvProject deleted successfully`,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error while deleting cvProject');
    }
  }
}

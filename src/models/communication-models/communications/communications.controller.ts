import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  Res,
  UploadedFiles,
  BadRequestException,
  Put,
  ParseIntPipe,
  UnauthorizedException,
  Delete,
} from '@nestjs/common';
import { CommunicationsService } from './communications.service';
import { CreateCommunicationDto } from './dto/create-communication.dto';
import { UpdateCommunicationDto } from './dto/update-communication.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CommunicationImagesPipe } from './interceptors/image.interceptor';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enum';
import { ResizeImageResult } from 'src/common/helper/transform/resize-image';
import { CommunicationDetailInterceptor } from './interceptors/communication-detail.interceptor';
import { CommunicationCreateInterceptor } from './interceptors/communication-create.interceptor';
import { RoleGuard } from 'src/authentication/role.guard';
import { AuthNotRequiredGuard } from 'src/authentication/authNotRequired.guard';
import { CommunicationNewsInterceptor } from './interceptors/communication-news.interceptor';
import ip from 'ip'

@ApiTags('Communications')
@Controller('communications')
export class CommunicationsController {
  constructor(private readonly communicationsService: CommunicationsService) { }

  // create communication by user

  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]))
  async create(
    @Body() createCommunicationDto: CreateCommunicationDto,
    @Req() req: CustomRequest,
    @Res() res: any,
    @UploadedFiles(CommunicationImagesPipe)
    listImages: ResizeImageResult[] | undefined,
  ) {
    try {

      if (!req.user?.id) {
        return new UnauthorizedException();
      }

      createCommunicationDto.accountId = req.user.id;

      createCommunicationDto.images = listImages;

      createCommunicationDto.type = 1;

      return res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: 'Create communication successfully',
        data: await this.communicationsService.create(createCommunicationDto),
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error creating communication');
    }
  }

  // Get five hbt news

  @UseInterceptors(ClassSerializerInterceptor, CommunicationNewsInterceptor)
  @ApiQuery({
    name: 'sort',
    description: 'cm (comments), l (likes), v (views).',
    required: false,
    enum: ['cm', 'l', 'v'],
  })
  @ApiQuery({
    name: 'limit',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  @ApiQuery({
    name: 'type',
    description: '0: new jobs, 1: working story',
    required: false,
    enum: [0, 1],
  })
  @UseGuards(AuthNotRequiredGuard)
  @Get('news')
  async findCommunication(@Req() req: CustomRequest) {
    try {
      const { sort, type } = req.query;

      const { limit = 5, page = 0 } = req;

      const accountId = req.user?.id;

      return await this.communicationsService.findCommunicationsByType(
        limit ? +limit - 1 : 5,
        page ? +page : 0,
        type ? +type : 0,
        sort?.toString(),
        accountId,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error finding communication');
    }
  }

  // Communication by account

  @Get('by-account')
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor, CommunicationCreateInterceptor)
  @UseGuards(AuthGuard)
  @ApiQuery({
    name: 'sort',
    description: 'cm (comments), l (likes), v (views).',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  async findOneByAccount(@Req() req: CustomRequest) {
    try {
      const { sort, limit, page } = req.query;
      const id = req.user?.id;
      if (!id) {
        throw new BadRequestException('User not found');
      }

      return await this.communicationsService.findCommunicationByAccountId(
        id,
        limit ? +limit : 20,
        page ? +page : 0,
        sort?.toString(),
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error finding communication');
    }
  }

  // Update communication by user

  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]))
  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiParam({
    name: 'id',
    description: 'id of communication.',
    required: true,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommunicationDto: UpdateCommunicationDto,
    @UploadedFiles(CommunicationImagesPipe)
    listImages: ResizeImageResult[] | undefined,
    @Req() req: CustomRequest,
  ) {
    try {
      updateCommunicationDto.id = id;
      updateCommunicationDto.accountId = req.user?.id;
      updateCommunicationDto.images = listImages;

      await this.communicationsService.update(updateCommunicationDto);
      return {
        status: HttpStatus.OK,
        message: 'Updated communication successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error update communication')
    }
  }

  // Get detail communication

  @UseInterceptors(ClassSerializerInterceptor, CommunicationDetailInterceptor)
  @Get('/detail/:id')
  @ApiParam({
    name: 'id',
    description: 'id of communication.',
    required: true,
  })
  @UseGuards(AuthNotRequiredGuard)
  async getByCommunicationId(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id || ip.address();

      return this.communicationsService.getCommunicationByCommunicationId(
        id,
        accountId,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException(
        'Error find communication by communicationId',
      );
    }
  }

  // Create communication by admin

  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @Post('by-admin')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]))
  async createByAdmin(
    @Body() createCommunicationDto: CreateCommunicationDto,
    @Req() req: CustomRequest,
    @Res() res: any,
    @UploadedFiles(CommunicationImagesPipe)
    listImages: ResizeImageResult[] | undefined,
  ) {
    try {
      if (!req.user?.id) {
        return new UnauthorizedException();
      }

      createCommunicationDto.accountId = req.user.id;

      createCommunicationDto.images = listImages;

      createCommunicationDto.type = 0;

      return res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: 'Create communication successfully',
        data: await this.communicationsService.create(createCommunicationDto),
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error creating communication');
    }
  }

  // Update by admin

  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]))
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @Put('/by-admin/:id')
  @ApiParam({
    name: 'id',
    description: 'id of communication.',
    required: true,
  })
  async updateByAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommunicationDto: UpdateCommunicationDto,
    @UploadedFiles(CommunicationImagesPipe)
    listImages: ResizeImageResult[] | undefined,
  ) {
    try {

      updateCommunicationDto.id = id;
      updateCommunicationDto.images = listImages;

      await this.communicationsService.updateByAdmin(updateCommunicationDto);
      return {
        status: HttpStatus.OK,
        message: 'Updated communication successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error update communication');
    }
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  async deleteCommunication(
    @Param('id') id: string, @Req() req: CustomRequest
  ) {
    try {
      const accountId = req.user?.id ? req.user.id : '';

      if (!accountId) {
        throw new BadRequestException('Authentication')
      }
      await this.communicationsService.deleteCommunication(+id, accountId);

      return {
        statusCode: HttpStatus.OK,
        message: 'Communication deleted successfully'
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error delete communication');
    }
  }


  @Delete('by-admin/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  async deleteCommunicationByAdmin (
    @Param('id') id: string,
  ){
    try {
      await this.communicationsService.deleteCommunicationByAdmin(+id);

      return {
        statusCode: HttpStatus.OK,
        message: 'Communication deleted successfully'
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error delete communication');
    }
  }
}

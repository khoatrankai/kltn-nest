import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  HttpStatus,
  Put,
  UseInterceptors,
  Res,
  UploadedFiles,
  ParseIntPipe,
  ClassSerializerInterceptor,
  Delete,
  BadGatewayException,
} from '@nestjs/common';
import { CommunicationCommentsService } from './communication-comments.service';
import { CreateCommunicationCommentDto } from './dto/create-communication-comment.dto';
import { UpdateCommunicationCommentDto } from './dto/update-communication-comment.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { ApiBasicAuth, ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CommunicationCommmentImagesPipe } from './interceptors/image.interceptor';
import { CommunicationCommentInterceptor } from './interceptors/communication-comment.interceptor';
import { DeleteCommunicationCommentDto } from './dto/delete-communication-comment.dto';

@ApiTags('Communication-comments')
@Controller('communication-comments')
export class CommunicationCommentsController {
  constructor(
    private readonly communicationCommentsService: CommunicationCommentsService,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBasicAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images', maxCount: 1 }], {
      limits: {
        fileSize: 1024 * 1024 * 1,
      },
    }),
  )
  async create(
    @Body() createCommunicationCommentDto: CreateCommunicationCommentDto,
    @Req() req: CustomRequest,
    @Res() res: any,
    @UploadedFiles(CommunicationCommmentImagesPipe)
    listImages: any | undefined,
  ) {
    const { images } = listImages;

    if (req.user?.id === undefined) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }

    createCommunicationCommentDto.accountId = req.user?.id ? req.user.id : '';
    createCommunicationCommentDto.images = images;

    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: await this.communicationCommentsService.create(
        createCommunicationCommentDto,
      ),
    });
  }
  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id of communication.',
    required: true,
  })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor, CommunicationCommentInterceptor)
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.communicationCommentsService.findOne(+id);
  }

  @Put(':communicationId/:commentId')
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images', maxCount: 1 }], {
      limits: {
        fileSize: 1024 * 1024 * 1,
      },
    }),
  )
  async update(
    @Param('communicationId', ParseIntPipe) communicationId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() updateCommunicationCommentDto: UpdateCommunicationCommentDto,
    @UploadedFiles(CommunicationCommmentImagesPipe)
    listImages: any | undefined,
    @Req() req: CustomRequest,
  ) {
    const { images } = listImages;

    updateCommunicationCommentDto.communicationId = +communicationId;
    updateCommunicationCommentDto.commentId = +commentId;
    updateCommunicationCommentDto.accountId = req.user?.id ? req.user.id : '';
    updateCommunicationCommentDto.images = images;

    return await this.communicationCommentsService.update(
      updateCommunicationCommentDto,
    );
  }

  @Delete(':communicationId/:commentId')
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard)
  async delete(
    @Req() req: CustomRequest,
    @Param('communicationId', ParseIntPipe) communicationId: number,
    @Body() deleteCommunicationCommentDto: DeleteCommunicationCommentDto,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    if (!req.user?.id) return new BadGatewayException('Authorization');

    deleteCommunicationCommentDto.communicationId = +communicationId;
    deleteCommunicationCommentDto.commentId = +commentId;
    deleteCommunicationCommentDto.accountId = req.user?.id ? req.user.id : '';

    return await this.communicationCommentsService.delete(
      deleteCommunicationCommentDto,
    );
  }
}

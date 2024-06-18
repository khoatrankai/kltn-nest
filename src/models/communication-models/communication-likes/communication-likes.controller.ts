import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { CommunicationLikesService } from './communication-likes.service';
import { CreateCommunicationLikeDto } from './dto/create-communication-like.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { ApiBasicAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Communication-likes')
@Controller('communication-likes')
export class CommunicationLikesController {
  constructor(
    private readonly communicationLikesService: CommunicationLikesService,
  ) {}

  @Post()
  @ApiBasicAuth()
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard)
  async createOrDelete(
    @Body() createCommunicationLikeDto: CreateCommunicationLikeDto,
    @Req() req: CustomRequest,
  ) {
    createCommunicationLikeDto.accountId = req.user?.id ? req.user.id : '';
    const data = await this.communicationLikesService.createOrDelete(
      createCommunicationLikeDto,
    );

    if (data) {
      return {
        status: HttpStatus.CREATED,
        data,
      };
    }

    return {
      status: HttpStatus.OK,
    };
  }

  // @Get(':id')
  // @UseGuards(AuthGuard)
  // @ApiParam({
  //   name: 'id',
  //   description: 'id of communication.',
  //   required: true,
  // })
  // @UseInterceptors(ClassSerializerInterceptor, CommunicationLikeInterceptor)
  // async findOne(@Param('id', ParseIntPipe) id: number) {
  //   try {
  //     return await this.communicationLikesService.findOne(id);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       throw new BadRequestException(error.message);
  //     }
  //     throw new BadRequestException('Error find all communication likes');
  //   }
  // }
}

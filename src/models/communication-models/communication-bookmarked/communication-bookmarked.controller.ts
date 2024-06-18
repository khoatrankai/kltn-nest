import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  HttpStatus,
  BadRequestException,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CommunicationBookmarkedService } from './communication-bookmarked.service';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { CreateCommunicationBookmarkedDto } from './dto/create-communication-bookmarked.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CommunicationBookmarkedInterceptor } from './interceptors/communication-bookmarked.interceptor';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Communication-bookmarked')
@Controller('communication-bookmarked')
export class CommunicationBookmarkedController {
  constructor(
    private readonly communicationBookmarkedService: CommunicationBookmarkedService,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async create(
    @Req() req: CustomRequest,
    @Body() createCommunicationBookmarkedDto: CreateCommunicationBookmarkedDto,
  ) {
    try {
      if (!req.user?.id) {
        throw new BadRequestException('Authorization');
      }
      createCommunicationBookmarkedDto.accountId = req.user?.id;
      const data = await this.communicationBookmarkedService.create(
        createCommunicationBookmarkedDto,
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
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error create communication bookmarked');
    }
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    ClassSerializerInterceptor,
    CommunicationBookmarkedInterceptor,
  )
  async findOne(@Req() req: CustomRequest) {
    try {
      const id = req.user?.id;
      const { limit, page } = req.query;

      if (!id) throw new BadRequestException('Authorization');

      return await this.communicationBookmarkedService.findOne(
        id,
        limit ? +limit : 20,
        page ? +page : 0,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error find communication bookmarked');
    }
  }
}

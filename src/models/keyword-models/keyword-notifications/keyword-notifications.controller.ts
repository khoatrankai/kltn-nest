import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  BadRequestException,
  Put,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { KeywordNotificationsService } from './keyword-notifications.service';
import { CreateKeywordNotificationDto } from './dto/create-keyword-notification.dto';
import { UpdateKeywordNotificationDto } from './dto/update-keyword-notification.dto';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { KeywordNotificationsSerializer } from './serializer/keyword-notifications.serializer';
// import { UpdateKeywordNotificationDto } from './dto/update-keyword-notification.dto';

@ApiTags('keyword-notifications')
@Controller('keyword-notifications')
export class KeywordNotificationsController {
  constructor(
    private readonly keywordNotificationsService: KeywordNotificationsService,
  ) { }

  /**
   *
   * @param createKeywordNotificationDto
   * @returns new keyword notification
   *
   * @description
   * This method is used to create a new keyword notification.
   * 1. Create keyword in keyword table
   * 2. Create keyword district in keyword district table
   * 3. Create keyword category in keyword category table
   *
   * If have any error, it will throw an error and rollback all queries.
   */
  @ApiBasicAuth()
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Req() req: CustomRequest,
    @Body() createKeywordNotificationDto: CreateKeywordNotificationDto,
  ) {
    try {
      createKeywordNotificationDto.accoundId = req.user?.id || '';
      return {
        status: HttpStatus.CREATED,
        message: 'Create keyword notification successfully',
        data: await this.keywordNotificationsService.create(
          createKeywordNotificationDto,
        ),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error creating keyword notification');
    }
  }

  /**
   * Get all keyword notifications by account id
   */
  @ApiBasicAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@Req() req: CustomRequest) {
    const id = req.user?.id || '';
    try {
      const data = await this.keywordNotificationsService.findAll(id);
      return {
        data: {
          status: data.status,
          keywords: data.data.map((keywordNotification) =>
            Object.assign(
              new KeywordNotificationsSerializer(keywordNotification, req.lang),
            ),
          ),
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error finding keyword notification');
    }
  }

  @ApiBasicAuth()
  /**
   * Update keyword notification
   */
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateKeywordNotificationDto: UpdateKeywordNotificationDto,
  ) {
    try {
      await this.keywordNotificationsService.update(
        id,
        updateKeywordNotificationDto,
      );
      return {
        status: HttpStatus.OK,
        message: 'Updated keyword notification successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error update keyword notification');
    }
  }
}

import {
  Controller,
  // Get,
  // Post,
  Body,
  Patch,
  Param,
  // Delete,
} from '@nestjs/common';
import { CommunicationNotificationsService } from './communication-notifications.service';
// import { CreateCommunicationNotificationDto } from './dto/create-communication-notification.dto';
import { UpdateCommunicationNotificationDto } from './dto/update-communication-notification.dto';

@Controller('communication-notifications')
export class CommunicationNotificationsController {
  constructor(
    private readonly communicationNotificationsService: CommunicationNotificationsService,
  ) {}

  // @Post()
  // create(
  //   @Body()
  //   createCommunicationNotificationDto: CreateCommunicationNotificationDto,
  // ) {
  //   return this.communicationNotificationsService.create(
  //     createCommunicationNotificationDto,
  //   );
  // }

  // @Get()
  // findAll() {
  //   return this.communicationNotificationsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.communicationNotificationsService.findOne(+id);
  // }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateCommunicationNotificationDto: UpdateCommunicationNotificationDto,
  ) {
    return this.communicationNotificationsService.update(
      +id,
      updateCommunicationNotificationDto,
    );
  }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.communicationNotificationsService.remove(+id);
  //   }
}

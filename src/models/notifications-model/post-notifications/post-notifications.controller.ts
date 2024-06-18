import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostNotificationsService } from './post-notifications.service';
import { CreatePostNotificationDto } from './dto/create-post-notification.dto';
import { UpdatePostNotificationDto } from './dto/update-post-notification.dto';

@Controller('post-notifications')
export class PostNotificationsController {
  constructor(
    private readonly postNotificationsService: PostNotificationsService,
  ) {}

  @Post()
  create(@Body() createPostNotificationDto: CreatePostNotificationDto) {
    return this.postNotificationsService.create(createPostNotificationDto);
  }

  @Get()
  findAll() {
    return this.postNotificationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postNotificationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostNotificationDto: UpdatePostNotificationDto) {
    return this.postNotificationsService.update(+id, updatePostNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postNotificationsService.remove(+id);
  }
}

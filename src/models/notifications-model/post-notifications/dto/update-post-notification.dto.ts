import { PartialType } from '@nestjs/swagger';
import { CreatePostNotificationDto } from './create-post-notification.dto';

export class UpdatePostNotificationDto extends PartialType(CreatePostNotificationDto) {}

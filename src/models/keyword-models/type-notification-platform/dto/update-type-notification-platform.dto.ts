import { PartialType } from '@nestjs/swagger';
import { CreateTypeNotificationPlatformDto } from './create-type-notification-platform.dto';

export class UpdateTypeNotificationPlatformDto extends PartialType(CreateTypeNotificationPlatformDto) {}

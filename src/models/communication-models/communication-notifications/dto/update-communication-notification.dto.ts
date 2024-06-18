import { PartialType } from '@nestjs/swagger';
import { CreateCommunicationNotificationDto } from './create-communication-notification.dto';

export class UpdateCommunicationNotificationDto extends PartialType(CreateCommunicationNotificationDto) {}

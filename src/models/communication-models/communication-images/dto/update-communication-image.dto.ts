import { PartialType } from '@nestjs/swagger';
import { CreateCommunicationImageDto } from './create-communication-image.dto';

export class UpdateCommunicationImageDto extends PartialType(CreateCommunicationImageDto) {}

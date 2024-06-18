import { PartialType } from '@nestjs/swagger';
import { CreateCommunicationViewDto } from './create-communication-view.dto';

export class UpdateCommunicationViewDto extends PartialType(CreateCommunicationViewDto) {}

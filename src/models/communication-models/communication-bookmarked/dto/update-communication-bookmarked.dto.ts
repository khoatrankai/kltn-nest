import { PartialType } from '@nestjs/swagger';
import { CreateCommunicationBookmarkedDto } from './create-communication-bookmarked.dto';

export class UpdateCommunicationBookmarkedDto extends PartialType(CreateCommunicationBookmarkedDto) {}

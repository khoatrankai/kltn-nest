import { PartialType } from '@nestjs/swagger';
import { CreateCommunicationLikeDto } from './create-communication-like.dto';

export class UpdateCommunicationLikeDto extends PartialType(CreateCommunicationLikeDto) {}

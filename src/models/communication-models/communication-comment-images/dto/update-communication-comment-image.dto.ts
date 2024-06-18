import { PartialType } from '@nestjs/swagger';
import { CreateCommunicationCommentImageDto } from './create-communication-comment-image.dto';

export class UpdateCommunicationCommentImageDto extends PartialType(CreateCommunicationCommentImageDto) {
    id!:number;
}

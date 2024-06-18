import { PartialType } from '@nestjs/swagger';
import { CreateCommunicationCommentDto } from './create-communication-comment.dto';
import { IsOptional } from 'class-validator';

export class UpdateCommunicationCommentDto extends PartialType(
  CreateCommunicationCommentDto,
) {
  commentId!: number;

  @IsOptional()
  deleteImages!: number[] | [];
}

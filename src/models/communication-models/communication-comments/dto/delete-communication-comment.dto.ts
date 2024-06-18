import { PartialType } from "@nestjs/swagger";
import { CreateCommunicationCommentDto } from "./create-communication-comment.dto";

export class DeleteCommunicationCommentDto extends PartialType(CreateCommunicationCommentDto) {
    commentId!:number;
}
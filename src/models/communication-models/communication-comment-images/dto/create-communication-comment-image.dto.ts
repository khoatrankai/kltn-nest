import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCommunicationCommentImageDto {

    constructor(commentId: number , image: string) {
        this.commentId = commentId;
        this.image = image;
    }
    @ApiProperty({type: 'number'})
    @IsNumber()
    @IsNotEmpty()
    commentId!: number;

    @ApiProperty({ type: 'string' })
    @IsNotEmpty()
    image!: string;

}

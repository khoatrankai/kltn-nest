import { ApiProperty } from "@nestjs/swagger";

export class CreateCvsPostDto {

    @ApiProperty({
        required: false,
        type: Number,
        default: 0
    })
    cvIndex!: number;

    @ApiProperty({
        required: false,
        type: Number,
        default: 0
    })
    postId!: number;

    @ApiProperty({
        required: false,
        type: Number,
        default: 0,
        description: "0: normal, 1: pinned"
    })
    type!: number;
}

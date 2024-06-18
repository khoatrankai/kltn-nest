import { ApiProperty } from "@nestjs/swagger";

export class DeleteCvsPostTypeDto {

    @ApiProperty({
        type: 'int',
        default: 0,
    })
    postId!:number;
}
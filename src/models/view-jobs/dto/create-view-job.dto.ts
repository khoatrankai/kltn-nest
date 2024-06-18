import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateViewJobDto {

    @ApiProperty({
        type: 'int',
        nullable: false,
        default: 1,
    })
    @IsNotEmpty()
    postId!:number;

    accountId!:string;

}

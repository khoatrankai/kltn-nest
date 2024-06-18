import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class DeleteCvsPostDto {

    @ApiProperty({
        type: 'int',
        default: 0,
    })
    @IsNotEmpty()
    type!:  number;

    @ApiProperty({
        type: 'int',
        default: 0,
    })
    @IsNotEmpty()
    cvIndex!: number;

    @IsOptional()
    accountId!: string;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ResetPasswordDto {

    @ApiProperty({
        type: 'string',
        example: 'newPassword',
    })
    @IsNotEmpty()
    newPassword!: string;

    @ApiProperty({
        type: 'string',
        example: 'baotoandd2016@gmail.com'
    })
    @IsNotEmpty()
    email!: string;
}
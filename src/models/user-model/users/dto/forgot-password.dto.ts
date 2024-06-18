import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class FotgotPasswordDto {

    @ApiProperty({
        type: 'string',
        default: 'baotoandd2016@gmail.com',
    })
    @IsNotEmpty()
    email!: string;
}
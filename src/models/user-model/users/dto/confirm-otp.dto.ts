import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ConfirmOtpDto {
    @ApiProperty({
        type: 'string',
        default: '123456',
    })
    @IsNotEmpty()
    otp!: string;

    @ApiProperty({
        type: 'string',
        default: 'baotoandd2016@gmail.com',
    })
    @IsNotEmpty()
    email!: string;
}
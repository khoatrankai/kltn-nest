import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateForgotPasswordDto {

    @ApiProperty(
        {
            type: String,
            description: 'Email of the user',
            required: true,
            default: 'baotoandd2016@gmail.com'
        }
    )
    @IsNotEmpty()
    email!: string;

    token!: string;

    ip!: string;

    expiresAt!: Date;

    status!: number;
}

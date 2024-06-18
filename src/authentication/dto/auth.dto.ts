import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";


export class SignInEmailDto {
    @ApiProperty({ description: 'Email', example: 'example@gmail.com' })
    @IsEmail()
    @IsNotEmpty()
    email!: string;
}
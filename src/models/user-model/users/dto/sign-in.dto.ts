import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInDto {

    @ApiProperty({type: 'varchar', maxLength: 50, nullable: false, default: 'string'})
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @ApiProperty({type: 'varchar', maxLength: 255, nullable: false, default: 'string'})
    @IsNotEmpty()
    password!: string;
}
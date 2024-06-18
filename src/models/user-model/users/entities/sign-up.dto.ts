import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SignUpDto {

    @ApiProperty({type: 'varchar', maxLength: 50, nullable: false, default: 'string'})
    @IsNotEmpty()
    email!: string;

    @ApiProperty({type: 'varchar', maxLength: 200, nullable: false, default: ''})
    @IsNotEmpty()
    name!: string;

    @ApiProperty({type: 'varchar', maxLength: 255, nullable: false, default: 'string'})
    @IsNotEmpty()
    password!: string;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class VerifyEmailDto {
    
    @ApiProperty({
        type: 'string',
        default: 'baotoandd2016@gmail.com'
    })
    @IsNotEmpty()
    email!: string;

    @ApiProperty({
        type: 'string',
        default: 'Super'
    })
    @IsNotEmpty()
    name!:string;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProfilesReferenceDto {

    accountId!:string;

    @ApiProperty({ type: 'string', format: 'string', required: true, maxLength: 255 })
    @IsNotEmpty()
    fullName!:string;

    @ApiProperty({ type: 'string', format: 'string', required: true, maxLength: 255 })
    @IsNotEmpty()
    phone!:string;

    @ApiProperty({ type: 'string', format: 'string', required: true, maxLength: 255 })
    @IsNotEmpty()
    email!:string;


    @ApiProperty({type: 'string', format: 'string', required: true, maxLength: 1000 })
    @IsNotEmpty()
    description!:string;
}

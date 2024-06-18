import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateAcademicTypeDto {

    @ApiProperty({type: 'varchar', maxLength: 50, required: true, default: 'string'})
    @IsNotEmpty()
    value!:string;

    @ApiProperty({type: 'varchar', maxLength: 15, required: true, default: 'string'})
    @IsNotEmpty()
    valueEn!:string;

    @ApiProperty({type: 'varchar', maxLength: 10, required: true, default: 'string'})
    @IsNotEmpty()
    valueKo!:string;

    @ApiProperty({type: 'tinyint', required: true, default: 1})
    @IsNotEmpty()
    status!:number;
}

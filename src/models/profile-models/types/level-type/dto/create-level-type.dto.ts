import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateLevelTypeDto {

    @ApiProperty({ type: 'string', format: 'string', required: true, maxLength: 255})
    @IsNotEmpty()
    value!: string;

    @ApiProperty({ type: 'string', format: 'string', required: true, maxLength: 255})
    @IsNotEmpty()
    valueEn!: string;

    @ApiProperty({ type: 'string', format: 'string', required: true, maxLength: 255})
    @IsNotEmpty()
    valueKo!: string;
}

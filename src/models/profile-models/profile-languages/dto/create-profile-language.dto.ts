import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProfileLanguageDto {
    
    accountId!: string;

    @ApiProperty({ type: 'number', format: 'number', nullable: false })
    @IsNotEmpty()
    languageLevelId!:number;

    @ApiProperty({ type: 'string', format: 'string', required: false, maxLength: 255 })
    @IsNotEmpty()
    languageName!:string;

}

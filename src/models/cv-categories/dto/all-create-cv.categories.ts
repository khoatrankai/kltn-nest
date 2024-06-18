import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class getAllPostCvCategoriesDto {
    @ApiProperty({
        type: 'number',
        description: 'Cv index',
        default: 0
    })
    @IsNotEmpty()
    cvIndex!: number;

    @IsOptional()
    accountId!: string;
}
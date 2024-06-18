import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class DeleteCvCategoriesDto {

    @ApiProperty({
        type: 'int',
        default: 1,
        description: 'Cv Index',
    })
    @IsNotEmpty()
    cvIndex!: number;

    @IsOptional()
    accountId!: string;

}
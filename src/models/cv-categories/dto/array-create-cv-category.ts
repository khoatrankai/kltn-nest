import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { CreateCvCategoryDto } from "./create-cv-category.dto";

export class CreateArrayCvCategory {
    @ApiProperty({
        type: 'array',
        items: {
            type: 'object',
            properties: {
                parentCategoryId: { type: 'int', default: 11 },
                wardId: { type: 'string', default: '08989' },
                percent: { type: 'int', default: 10 },
                cvIndex: { type: 'int', default: 0 },
            },
        },
    })
    @IsNotEmpty()
    data!: CreateCvCategoryDto[];

    @IsOptional()
    accountId!: string;
}
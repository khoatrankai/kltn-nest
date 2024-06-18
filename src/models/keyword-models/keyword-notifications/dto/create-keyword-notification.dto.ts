import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateKeywordNotificationDto {

    @IsOptional()
    accoundId!: string;

    @ApiProperty({ type: 'string', format: 'string' })
    @IsNotEmpty()
    @ApiProperty({ type: 'string', format: 'string', required: true })
    @IsString({message: 'keyword must be a string'})
    keyword!: string;

    @ApiProperty({ type: 'array', items: { type: 'number' } })
    @IsNotEmpty()
    @IsArray()
    @ArrayMaxSize(10, { message: 'categoriesId cannot have more than 10 items' })
    @ApiProperty({ type: 'array', items: { type: 'number', format: 'number' }, required: true })
    categoriesId!: number[];

    @ApiProperty({ type: 'array', items: { type: 'string' } })
    @IsNotEmpty()
    @ArrayMaxSize(10, { message: 'districtsId cannot have more than 10 items' })
    @ApiProperty({ type: 'array', items: { type: 'string', format: 'string' }, required: true })
    districtsId!: string[];

    @IsOptional()
    @IsString({message: 'districtId must be a string'})
    districtId?: string;

    @IsOptional()
    @IsString({message: 'categoryId must be a string'})
    categoryId?: number;
}

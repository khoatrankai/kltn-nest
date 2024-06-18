import { QUERY_CHILDREN_CATEGORY_ID, QUERY_DISTRICTS, QUERY_PARENT_CATEGORY_ID, QUERY_PROVINCES } from 'src/common/constants/postQuery.constants';
import { Type, plainToClass } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsOptional } from 'class-validator';
import {
  
} from 'src/common/constants';
export class NewestPostQueriesDto {
    // Not required
    @ApiProperty({ type: 'array', required: false, items: { type: 'number' } })
    @IsNumber({}, { each: true })
    @Type(() => Number)
    @IsOptional()
    [QUERY_CHILDREN_CATEGORY_ID]?: number[];

    @ApiProperty({ type: 'number', required: false, format: 'number' })
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    [QUERY_PARENT_CATEGORY_ID]?: number;
    
    @ApiProperty({ type: 'array', required: false, items: { type: 'string' } })
    @IsNumberString({}, { each: true })
    @IsOptional()
    [QUERY_DISTRICTS]?: string[]

    @ApiProperty({ type: 'string', required: false, format: 'number' })
    @IsNumberString()
    @IsOptional()
    [QUERY_PROVINCES]?: string;

    @ApiProperty({ type: 'number', required: false, format: 'number' })
    @IsNumber()
    @IsOptional()
    threshold?: number;

    @ApiProperty({ type: 'number', required: false, format: 'number' })
    @IsNumber()
    @IsOptional()
    page?: number;

    @ApiProperty({ type: 'number', required: false, format: 'number' })
    @IsNumber()
    @IsOptional()
    limit?: number;


    [key: string]: any;

    constructor(partial: Partial<NewestPostQueriesDto>) {
        Object.assign(this, partial);
    }

    static from(plain: string) {
        return plainToClass(NewestPostQueriesDto, plain);
    }
}

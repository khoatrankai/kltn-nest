import { plainToClass } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';
import {
    QUERY_CHILDREN_CATEGORY_ID,
    QUERY_IS_REMOTELY,
    QUERY_IS_SHORT_TIME_JOBS,
    QUERY_IS_TODAY_JOBS,
    QUERY_JOB_TYPE,
    QUERY_PARENT_CATEGORY_ID,
} from 'src/common/constants';
import { OneOfOptionalRequired } from 'src/common/decorators/validation';
export class HotTopicQueriesDto {
    // Not required
    @ApiProperty({ type: 'number', required: false, format: 'number' })
    @IsString()
    @IsOptional()
    [QUERY_CHILDREN_CATEGORY_ID]?: string;

    @ApiProperty({ type: 'number', required: false, format: 'number' })
    @IsNumber()
    @IsOptional()
    [QUERY_PARENT_CATEGORY_ID]?: string;

    @ApiProperty({ type: 'number', required: false, format: 'number' })
    @OneOfOptionalRequired(['1', '0'])
    @IsString()
    @IsOptional()
    [QUERY_IS_REMOTELY]?: string;

    @ApiProperty({ type: 'number', required: false, format: 'number' })
    // @IsNumberString()
    @OneOfOptionalRequired([1, 0])
    @IsNumber()
    @IsOptional()
    [QUERY_IS_SHORT_TIME_JOBS]?: number;

    @ApiProperty({ type: 'number', required: false, format: 'number' })
    // @IsNumberString()
    @OneOfOptionalRequired([1, 0])
    @IsNumber()
    @IsOptional()
    [QUERY_IS_TODAY_JOBS]?: number;

    @ApiProperty({ type: 'number', format: 'numer', required: false })
    @IsNumber()
    @IsOptional()
    [QUERY_JOB_TYPE]?: number;

    @ApiProperty({ type: 'string', format: 'string', required: false })
    @IsString()
    @IsNumberString()
    @IsOptional()
    provinceId?: string;


    [key: string]: any;

    constructor(partial: Partial<HotTopicQueriesDto>) {
        Object.assign(this, partial);
    }

    static from(plain: string) {
        return plainToClass(HotTopicQueriesDto, plain);
    }
}

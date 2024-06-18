import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class CreateCommunicationDto {

    @IsOptional()
    accountId!: string;

    @ApiProperty({ type: 'string', format: 'string', maxLength: 500, required: true, default: 'Test' })
    @IsNotEmpty()
    @MaxLength(500, { message: 'title length must not exceed 500 characters' })
    title!: string;

    @ApiProperty({ type: 'string', format: 'string', maxLength: 10000, required: true, default: 'Test' })
    @IsNotEmpty()
    @MaxLength(10000, { message: 'content length must not exceed 10000 characters' })
    content!: string;

    // @ApiProperty({type: 'number',format: 'number', required: true, default: 1})
    // @IsOptional()
    // status!:number;

    // @ApiProperty({ type: 'number', format: 'number', required: true, default: 1})
    type!: number;

    @ApiProperty({ type: 'array', items: { type: 'file', format: 'binary' }, required: false })
    @IsOptional()
    images!: any;

    @ApiProperty({ type: 'array', items: { type: 'number', format: 'number' }, required: false })
    @IsOptional()
    categoryId!: number[];

    
}

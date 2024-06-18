import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDecimal, IsOptional } from "class-validator";

export class UpdateCompanyImageDto {
    @ApiProperty({ type: 'array', items: { type: 'number' }, required: false })
    @IsArray({ message: 'Id must be an array of number' })
    @IsDecimal({}, { each: true, message: 'Id must be an array of number' })
    @IsOptional()
    imagesId!: number[]

    @ApiProperty({ type: 'file', format: 'binary', required: false })
    @IsOptional()
    images!: File[] | undefined;

}

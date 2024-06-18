import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { ChildCategory } from "../../children/entities/child.entity";

export class CreateParentDto {

    @ApiProperty({
        type: 'string',
        format: 'string',
        required: true,
        default: 'Test',
    })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    name!: string;

    @ApiProperty({
        type: 'file',
        format: 'binary',
        required: false,
        isArray: true,
    })
    @IsOptional()
    image!: string;

    @ApiProperty({
        type: 'file',
        format: 'binary',
        required: false,
        isArray: true,
    })
    @IsOptional()
    defaultPostImage!: string;

    @ApiProperty({
        type: 'string',
        format: 'string',
        required: true,
        default: 'Test',
    })
    @IsString()
    @MaxLength(100)
    @IsOptional()
    nameEn!: string;

    @ApiProperty({
        type: 'string',
        format: 'string',
        required: true,
        default: 'Test',
    })
    @IsString()
    @MaxLength(100)
    @IsOptional()
    nameKor!: string;

    @ApiProperty({ type: 'number', format: 'number', required: true, default: 1 })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsOptional()
    status!: number;

    @IsOptional()
    childCategories!: ChildCategory[] | undefined;
}

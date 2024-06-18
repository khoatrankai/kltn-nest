import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateChildDto {

    @IsOptional()
    @IsNumber()
    parentCategoryId!: number;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    name!: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    nameEn!: string

    @IsString()
    @IsOptional()
    @MaxLength(255)
    nameKor!: string

    @IsNumber()
    @IsOptional()
    status!: number;
}

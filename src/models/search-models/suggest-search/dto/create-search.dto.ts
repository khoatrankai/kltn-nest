import { IsNumber, IsOptional, IsString } from "class-validator";
export class CreateSuggestSearchDto {
    
    @IsString()
    @IsOptional()
    keyword!: string;

    @IsNumber()
    @IsOptional()
    status!: number;

    @IsNumber()
    @IsOptional()
    order!: number;
    
}
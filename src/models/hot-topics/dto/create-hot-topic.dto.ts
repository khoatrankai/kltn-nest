import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateHotTopicDto {

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsInt()
    type!: number;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsInt()
    detailId!: number;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    title!: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    image!: string;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsInt()
    themeId!: number;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsInt()
    order!: number;
}
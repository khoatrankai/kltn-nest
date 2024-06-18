import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class DeleteBannerDto {
    @ApiProperty({
        type: 'string',
        format: 'string',
        required: true,
        default: 'Test',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(100)
    imageName!: string;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsInt()
    id!: number;
}

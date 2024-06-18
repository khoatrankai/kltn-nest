import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class DeleteCvProjectDto {
    accountId!: string;

    @ApiProperty({
        type: Number,
        description: 'cv index',
        required: true,
    })
    @IsOptional()
    cvindex!: number;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateProfileCvsTemplate {

    @IsOptional()
    accountId!: string;

    @IsOptional()
    cvIndex!: number;

    @ApiProperty({ type: 'int', nullable: false, default: 0 })
    @IsOptional()
    templateId!: number;
}
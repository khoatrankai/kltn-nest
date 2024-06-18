import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTypeNotificationPlatformDto {


    @IsString({message: "AccountId must be a string"})
    @ApiProperty({ type: 'string', format: 'string', required: true })
    accountId!: string;

    @ApiProperty({ type: 'number', format: 'number', required: true })
    @IsNumber()
    @IsOptional()
    type!: number;

    @ApiProperty({ type: 'number', format: 'number', required: true })
    @IsNumber()
    emailStatus!: number;

    @ApiProperty({ type: 'number', format: 'number', required: true })
    @IsNumber()
    pushStatus!:number
}

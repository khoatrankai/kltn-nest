import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateServiceHistoryDto {

    @IsNotEmpty()
    @ApiProperty({
        type: 'int',
        description: 'Service Recruitment Id',
        required: true,
        default: 1
    })
    serviceRecruitmentId!: number;

    @IsOptional()
    accountId!: string;
}

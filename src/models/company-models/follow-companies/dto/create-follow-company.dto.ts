import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateFollowCompanyDto {

    accountId!: string;

    @ApiProperty({
        type: 'number',
        description: 'The company id',
        default: 1
    })
    @IsNotEmpty()
    companyId!: number;
}

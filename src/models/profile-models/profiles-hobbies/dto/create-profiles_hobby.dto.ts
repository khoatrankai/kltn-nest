import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProfilesHobbyDto {

    accountId!: string;

    @ApiProperty({ type: 'string', format: 'string', required: true, maxLength: 1000 })
    @IsNotEmpty()
    description!: string;
}

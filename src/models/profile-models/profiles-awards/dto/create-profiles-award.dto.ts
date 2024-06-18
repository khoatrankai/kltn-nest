import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProfilesAwardDto {

    accountId!: string;

    @ApiProperty({ type: 'string', format: 'string', required: true, maxLength: 255 })
    @IsNotEmpty()
    title!: string;

    @ApiProperty({ type: 'string', format: 'string', required: true, maxLength: 1000})
    @IsNotEmpty()
    description!: string;
}

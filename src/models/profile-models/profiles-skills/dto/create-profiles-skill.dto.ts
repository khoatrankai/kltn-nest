import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProfilesSkillDto {

    accountId!: string;

    @ApiProperty({ type: 'number', format: 'number', nullable: true })
    @IsNotEmpty()
    skillLevelId!:number;

    @ApiProperty({ type: 'string', format: 'string', required: true , maxLength: 255})
    @IsNotEmpty()
    skillName!:string;
}

import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateProfilesEducationDto } from "./create-profiles-educations.dto";
import { IsNotEmpty } from "class-validator";

export class UpdateProfilesEducationDto extends PartialType(CreateProfilesEducationDto)  {

    @ApiProperty({ type: 'number', required: true, default: 5 })
    @IsNotEmpty()
    educationId!:number;

}
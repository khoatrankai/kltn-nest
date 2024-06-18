import { ApiProperty } from "@nestjs/swagger";

export class DeleteProfilesEducationDto {

    @ApiProperty({ type: 'number', required: true, default: 5 })
    educationId!:number;

    accountId!:string;
}
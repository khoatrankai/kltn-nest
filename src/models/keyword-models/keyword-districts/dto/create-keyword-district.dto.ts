import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateKeywordDistrictDto {

    constructor(keywordId: number, districtId: string) {
        this.keywordId = keywordId;
        this.districtId = districtId;
    }

    @IsNotEmpty()
    @ApiProperty({ type: 'number', format: 'number', required: true })
    keywordId!: number;

    @IsNotEmpty()
    districtId!: string;
}
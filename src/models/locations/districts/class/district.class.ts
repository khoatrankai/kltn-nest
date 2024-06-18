import { ApiProperty } from "@nestjs/swagger";
import { ILocation } from "../../location.interface";
import { Province } from "../../provinces/entities";


// District class
// This class is used to define the structure of a district
export class CDistrict implements ILocation {
    @ApiProperty({ type: String })
    id!: string;

    @ApiProperty({ type: String })
    name!: string;

    @ApiProperty({ type: String })
    fullName!: string;

    @ApiProperty({ type: String })
    codeName?: string;

    @ApiProperty({ type: String })
    nameEn!: string;

    @ApiProperty({ type: String })
    fullNameEn!: string;

    @ApiProperty({ type: String })
    provinceId!: string;

    @ApiProperty({ type: String })
    province!: Province | undefined;
}
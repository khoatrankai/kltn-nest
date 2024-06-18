import { ApiProperty } from "@nestjs/swagger";
import { ILocation } from "../../location.interface";

export class IProvince implements ILocation {
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

    // administrativeUnitId!: number;
    // administrativeUnitParentId!: number;
}
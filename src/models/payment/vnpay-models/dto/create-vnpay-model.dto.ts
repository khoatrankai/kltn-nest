import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateVnpayModelDto {
    @ApiProperty({
        type: 'int',
        nullable: false,
        default: 0
    })
    @IsNotEmpty()
    amount!: number;

    @ApiProperty({
        type: 'varchar',
        nullable: false,
        default: ''
    })
    @IsOptional()
    bankCode!: string;


    @ApiProperty({
        type: 'varchar',
        nullable: false,
        default: 'vn'
    })
    @IsNotEmpty()
    language!: string;
}

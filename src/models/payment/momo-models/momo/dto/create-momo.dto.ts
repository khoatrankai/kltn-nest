import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateMomoDto {

    @ApiProperty(
        {
            type: String,
            description: 'amount of money to pay',
            required: true,
            default: '10000'
        }
    )
    @IsNotEmpty()
    amount!: string;

    @ApiProperty(
        {
            type: String,
            description: 'extra data',
            required: true,
            default: 'Thanh toan MOMO'
        }
    )
    @IsOptional()
    extraData?: string;
}

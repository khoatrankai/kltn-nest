import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateBlockReasonDto {

    @ApiProperty({
        description: "Reason for blocking",
        type: String,
        required: true,
        maxLength: 1000,
        default: "This is a reason"
    })
    @IsNotEmpty()
    reason!: string;
}

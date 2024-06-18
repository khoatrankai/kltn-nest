import { PartialType } from '@nestjs/mapped-types';
import { CreateBlockReasonDto } from './create-block-reason.dto';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBlockReasonDto extends PartialType(CreateBlockReasonDto) {
    constructor() {
        super();
    }

    @ApiProperty({
        description: "Reason for blocking",
        type: String,
        required: false,
        maxLength: 1000,
        default: "This is a reason"
    })
    @IsOptional()
    override reason!: string;

    @ApiProperty({
        description: "Status of the block reason",
        type: Number,
        required: false,
        default: 1
    })
    @IsOptional()
    status!: number;
}

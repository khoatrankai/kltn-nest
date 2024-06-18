import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class BlockUserDto {

    @ApiProperty({
        type: String,
        description: 'Description of the block user',
        default: 'User is blocked because of ...'
    })
    @MaxLength(5000)
    @IsOptional()
    description!: string;


    @ApiProperty({
        type: String,
        description: 'Id of the user to block',
        default: '3d5f6d5f6d5f6d5f6d5f6d5f'
    })
    @IsNotEmpty()
    user_Id!: string;

    @ApiProperty({
        type: Number,
        description: 'Status of the block',
        default: 1
    })
    @IsNotEmpty()
    status!: number;

    @ApiProperty({
        type: Number,
        description: 'Id of the reason for blocking',
        default: 1
    })
    @IsNotEmpty()
    reasonId!: number;
}
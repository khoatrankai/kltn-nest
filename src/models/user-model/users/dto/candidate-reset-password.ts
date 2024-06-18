import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CandidateResetPasswordDto {
    @ApiProperty({
        type: 'varchar',
        nullable: false,
        default: '123456',
    })
    @IsNotEmpty()
    password!: string;

    @ApiProperty({
        type: 'varchar',
        nullable: false,
        default: '123456',
    })
    @IsNotEmpty()
    confirmPassword!: string;

    @ApiProperty({
        type: 'varchar',
        nullable: false,
        default: '123456',
    })
    @IsNotEmpty()
    token!: string;
}
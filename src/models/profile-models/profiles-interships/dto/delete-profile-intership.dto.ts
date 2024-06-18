import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteProfilesIntershipDto {
    accountId!:string;

    @ApiProperty({ type: "array", items: { type: "number" } })
    @IsNumber({}, { each: true })
    @ArrayMinSize(1)
    @IsNotEmpty()
    ids!: number[];
}

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProfileDto } from './create-profile.dto';
import { IsOptional } from 'class-validator';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {

    accountId!:string;

    @ApiProperty({type: 'int', default: 0})
    @IsOptional()
    jobTypeId!:number;

    @ApiProperty({type: 'varchar', description: 'Job name of profile', maxLength: 255, default: 'string'})
    @IsOptional()
    jobTypeName!:string;

    @ApiProperty({type: 'int', default: 1})
    @IsOptional()
    isSearch!:number;


    @ApiProperty({
        type: 'array',
        items: {
            type: 'int',
        },
        default: [1, 2],
    })
    @IsOptional()
    cvIds!:number[];
}

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCommunicationDto } from './create-communication.dto';
import { IsOptional } from 'class-validator';

export class UpdateCommunicationDto extends PartialType(CreateCommunicationDto) {

    @ApiProperty({type: 'number',format: 'number', required: true})
    id!: number;

    @ApiProperty({type: 'number',format: 'number', required: true, default: 1})
    @IsOptional()
    status!:number;

    @ApiProperty({type: 'array',items: { type: 'number', format: 'number' }, required: false})
    @IsOptional()
    deleteImages!: number[] | [];
}

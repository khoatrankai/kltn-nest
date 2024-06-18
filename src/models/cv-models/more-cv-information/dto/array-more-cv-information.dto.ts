import { ApiProperty } from '@nestjs/swagger';
import {  IsNotEmpty } from 'class-validator';
import { CreateMoreCvInformationDto } from './create-more-cv-information.dto';

export class ArrayCreateMoreCvInformationDto {

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        cvInformationId: { type: 'int', default: 1 },
        content: { type: 'varchar', default: 'Content' },
        padIndex: { type: 'int', default: 0},
      },
    },
  })
  @IsNotEmpty()
  data!: CreateMoreCvInformationDto[];
}

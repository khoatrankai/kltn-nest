import { ApiProperty } from '@nestjs/swagger';
import { CreateCvExtraInformationDto } from './create-cv-extra-information.dto';
import {  IsNotEmpty, IsOptional } from 'class-validator';

export class ArrayCreateCvExtraInformationDto {

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        type: { type: 'varchar', default: 'type1' },
        row: { type: 'int', default: 0 },
        col: { type: 'int', default: 0 },
        cvIndex: { type: 'int', default: 0 },
        part: { type: 'int', default: 0 },
        padIndex: { type: 'int', default: 0 },
        moreCvExtraInformations: {type: 'array', items: {
          type: 'object',
          properties: {
            position: { type: 'string', default: 'position'},
            time: { type: 'varchar', default: 'time' },
            company: { type: 'varchar', default: 'company' },
            description: { type: 'varchar', default: 'description' },
            index: { type: 'int', default: 0 },
            padIndex: { type: 'int', default: 0},
          }
        }}
      },
    },
  })
  @IsNotEmpty()
  data!: CreateCvExtraInformationDto[];

  @IsOptional()
  accountId!: string;
}

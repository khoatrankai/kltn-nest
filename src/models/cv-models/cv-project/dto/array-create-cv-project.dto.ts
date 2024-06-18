import { ApiProperty } from '@nestjs/swagger';
import { CreateCvProjectDto } from './create-cv-project.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ArrayCreateCvProjectDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        type: { type: 'string', default: 'Project Title', maxLength: 255 },
        row: { type: 'int', default: 0 },
        part: { type: 'int', default: 0 },
        col: { type: 'int', default: 0 },
        cvIndex: { type: 'int', default: 0 },
        padIndex: { type: 'int', default: 0 },
        moreCvProjects: {
          type: 'array', items: {
            type: 'object',
            properties: {
              name: { type: 'string', default: 'Project Name', maxLength: 1000 },
              time: { type: 'string', default: 'Time', maxLength: 50 },
              link: { type: 'string', default: 'Link', maxLength: 50 },
              participant: { type: 'string', default: 'Participant', maxLength: 50 },
              position: { type: 'string', default: 'Position', maxLength: 100 },
              functionality: { type: 'string', default: 'Functionality', maxLength: 1000 },
              technology: { type: 'string', default: 'Technology', maxLength: 1000 },
              index: { type: 'int', default: 0 },
              padIndex: { type: 'int', default: 0 },
            }
          }
        }
      },
    },
  })
  @IsNotEmpty()
  data!: CreateCvProjectDto[];


  @IsOptional()
  accountId!: string;
}

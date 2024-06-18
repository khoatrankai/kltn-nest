import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
// import { IsNumber } from 'class-validator';

export class FilterCandidatesDto {
  @ApiProperty({
    type: 'array',
    items: { type: 'number' },
    required: false,
    description: 'District id'
  })
  @IsOptional()
  addresses!: number[];

  @ApiProperty({
    type: 'array',
    items: { type: 'number' },
    required: false,
    description: 'Child categories id'
  })
  @IsOptional()
  categories!: number[];

  @ApiProperty({
    type: 'array',
    items: { type: 'number' },
    required: false,
    description: 'Academic id'
  })
  @IsOptional()
  educations!: number[];

  @ApiProperty({ type: 'int', required: false, default: 1 })
  @IsOptional()
  gender!: number;

  @ApiProperty({ type: 'int', required: false, default: 18 })
  @IsOptional()
  ageMin!: number;

  @ApiProperty({ type: 'int', required: false, default: 50 })
  @IsOptional()
  ageMax!: number;

  @ApiProperty({ type: 'int', required: false, default: 20 })
  @IsOptional()
  limit!: number;

  @ApiProperty({ type: 'int', required: false, default: 0 })
  @IsOptional()
  page!: number;

  accountId!: string;
}

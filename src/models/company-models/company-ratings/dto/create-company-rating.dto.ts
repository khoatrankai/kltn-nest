import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCompanyRatingDto {
  @IsOptional()
  accountId!: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'int',
    description: 'company id',
    default: 1,
    maxLength: 10,
  })
  companyId!: number;

  @IsNotEmpty()
  @ApiProperty({
    type: 'varchar',
    description: 'comment',
    default: 'Comment of user',
    maxLength: 1000,
  })
  comment!: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'varchar',
    description: 'star',
    default: '5',
    maxLength: 10,
  })
  star!: string;

  @IsOptional()
  status!: number;
}

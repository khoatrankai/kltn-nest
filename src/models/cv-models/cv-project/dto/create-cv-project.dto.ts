import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateCvProjectDto {
  @IsOptional()
  accountId!: string;

  @ApiProperty({
    type: 'varchar',
    default: 'Project Title',
    maxLength: 255,
    nullable: false,
  })
  @IsOptional()
  title!: string;

  @ApiProperty({
    type: 'int',
    default: 0,
    nullable: true,
  })
  row!: number;

  @ApiProperty({
    type: 'int',
    default: 0,
    nullable: true,
  })
  part!: number;

  @ApiProperty({
    type: 'int',
    default: 0,
    nullable: true,
  })
  col!: number;

  @ApiProperty({
    type: 'int',
    default: 0,
    maxLength: 1000,
    nullable: true,
  })
  cvIndex!: number;

  @ApiProperty({
    type: 'int',
    default: 0,
    maxLength: 1000,
    nullable: true,
  })
  padIndex!: number;
}

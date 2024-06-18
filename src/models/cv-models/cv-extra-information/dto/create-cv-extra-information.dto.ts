import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateCvExtraInformationDto {
  @IsOptional()
  accountId!: string;

  @ApiProperty({
    type: 'varchar',
    nullable: true,
    default: 'type1',
    maxLength: 5,
  })
  @IsOptional()
  type!: string;

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
    nullable: true,
  })
  padIndex!: number;
}

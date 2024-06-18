import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { IsTimestamp } from 'src/common/decorators/validation';

export class CreateProfilesActivityDto {
  accountId!: string;

  @ApiProperty({
    type: 'string',
    format: 'string',
    required: false,
    maxLength: 255,
  })
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    type: 'string',
    format: 'string',
    required: true,
    maxLength: 255,
  })
  @IsNotEmpty()
  organization!: string;

  @ApiProperty({
    type: 'string',
    format: 'string',
    required: true,
    maxLength: 1000
  })
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ type: 'number', required: true })
  @IsNotEmpty()
  @IsTimestamp()
  @Type(() => String)
  startDate!: string;

  @ApiProperty({ type: 'number', required: true })
  @IsNotEmpty()
  @IsTimestamp()
  @Type(() => String)
  endDate!: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { IsTimestamp } from 'src/common/decorators/validation';

export class CreateProfilesCourseDto {

  accountId!: string;

  @ApiProperty({ type: 'string', format: 'string', required: true, maxLength: 255 })
  @IsNotEmpty()
  courseName!: string;

  @ApiProperty({ type: 'string', format: 'string', required: true, maxLength: 255 })
  @IsNotEmpty()
  insitiutionName!: string;

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

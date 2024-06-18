import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { IsTimestamp } from 'src/common/decorators/validation';

export class CreateProfilesIntershipDto {
  accountId!: string;

  @ApiProperty({ type: 'string', format: 'string', required: true, maxLength: 255 })
  @IsNotEmpty()
  jobTitle!: string;

  @ApiProperty({ type: 'string', format: 'string', required: true, maxLength: 255 })
  @IsNotEmpty()
  employer!: string;

  @ApiProperty({ type: 'string', format: 'string', required: true, maxLength: 1000 })
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

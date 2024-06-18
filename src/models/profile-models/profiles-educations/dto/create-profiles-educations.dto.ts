import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { IsTimestamp } from "src/common/decorators/validation";

export class CreateProfilesEducationDto {
  accountId!: string;

  @ApiProperty({ type: 'string', format: 'string', required: true, maxLength: 50, default: 'TDT University' })
  @IsNotEmpty()
  companyName!: string;

  @ApiProperty({ type: 'string', format: 'string', required: true, maxLength: 50, default: 'Software Engineering' })
  @IsNotEmpty()
  major!: string;

  @ApiProperty({ type: 'number', required: true ,default : 1568073600000 })
  @IsNotEmpty()
  @IsTimestamp()
  @Type(() => String)
  startDate!: string;

  @ApiProperty({ type: 'number', required: true , default: 1686528000000 })
  @IsNotEmpty()
  @IsTimestamp()
  @Type(() => String)
  endDate!: string;

  @ApiProperty({ type: 'string', format: 'string', required: true, maxLength: 50, default: 'Nothing to tell' })
  @IsNotEmpty()
  extraInformation!: string;

  @ApiProperty({ type: 'number', required: true, default: 8 })
  @IsNotEmpty()
  academicTypeId!: number;
}

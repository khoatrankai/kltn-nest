import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class DeleteCvInformationDto {
  @ApiProperty({
    type: Number,
    description: 'cv index',
    required: true,
  })
  @IsOptional()
  cvindex!: number;

  accountId!: string;
}

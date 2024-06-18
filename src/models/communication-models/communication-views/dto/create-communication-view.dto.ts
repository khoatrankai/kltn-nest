import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommunicationViewDto {
  @ApiProperty({
    type: 'number',
    format: 'number',
    required: true,
    default: 1,
  })
  @IsNotEmpty()
  communicationId!: number;

  accountId!: string;
}

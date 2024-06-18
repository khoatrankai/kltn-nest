import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommunicationLikeDto {
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

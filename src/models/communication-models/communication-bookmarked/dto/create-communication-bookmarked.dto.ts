import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommunicationBookmarkedDto {
  accountId!: string;

  @ApiProperty({
    type: 'number',
    maxLength: 11,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  communicationId!: number;
}

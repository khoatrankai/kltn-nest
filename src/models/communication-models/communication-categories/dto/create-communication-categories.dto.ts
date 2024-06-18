import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommunicationCategoriesDto {
  constructor(communicationId: number, categoryId: number) {
    this.communicationId = communicationId;
    this.categoryId = categoryId;
  }

  @ApiProperty({ type: 'number', format: 'number', required: true })
  @IsNotEmpty()
  communicationId!: number;

  @ApiProperty({ type: 'number', format: 'number', required: true })
  @IsNotEmpty()
  categoryId!: number;
}

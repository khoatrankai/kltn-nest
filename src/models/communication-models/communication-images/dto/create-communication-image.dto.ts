import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommunicationImageDto {
  constructor(communicationId: number, image: string) {
    this.communicationId = communicationId;
    this.image = image;
  }

  @ApiProperty({ type: 'number', format: 'number', required: true })
  @IsNotEmpty()
  communicationId!: number;

  @ApiProperty({ type: 'varchar', format: 'varchar', required: true })
  @IsOptional()
  image!: string;

  @ApiProperty({ type: 'number', format: 'number', required: true, default: 1 })
  @IsOptional()
  status!: number;
}

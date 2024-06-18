import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class CreateCommunicationCommentDto {
  @ApiProperty({ type: 'number', nullable: false })
  @IsNotEmpty()
  @IsNumber()
  communicationId!: number;

  accountId!: string;

  @ApiProperty({type: 'string',format: 'string',maxLength: 3000 , required: true, default: 'Content'})
  @IsNotEmpty()
  @MaxLength(3000, { message: 'content length must not exceed 3000 characters' })
  content!: string;

  @ApiProperty({
    type: 'array',
    items: { type: 'file', format: 'binary' },
    required: false,
  })
  @IsOptional()
  images!: string[] | undefined;
}

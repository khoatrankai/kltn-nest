import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCandidateBookmarkDto {
  @ApiProperty({ type: 'string', nullable: false, required: true })
  @IsNotEmpty()
  candidateId!: string;

  recruitId!: string;
}

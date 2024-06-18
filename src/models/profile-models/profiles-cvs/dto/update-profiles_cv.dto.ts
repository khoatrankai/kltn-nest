// import { ApiProperty } from '@nestjs/swagger';
// import { IsOptional } from 'class-validator';

export class UpdateProfilesCvDto {
  id!: number;

  accountId!: string;

  // @ApiProperty({type: 'number', nullable: false, default: 0})
  // @IsOptional()
  // status!: number;
}

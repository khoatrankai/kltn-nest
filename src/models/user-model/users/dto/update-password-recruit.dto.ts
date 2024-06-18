import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePasswordRecuitDto {
  @IsOptional()
  accoutId!: string;

  @ApiProperty({
    type: 'varchar',
    nullable: false,
    default: '123456',
  })
  @IsNotEmpty()
  oldPassword!: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'varchar',
    nullable: false,
    default: '123456',
  })
  password!: string;
}

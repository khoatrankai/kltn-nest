import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateCvInformationDto {
  @ApiProperty({
    type: 'varchar',
    default: 'Nguyen Van A',
    maxLength: 255,
    required: false,
  })
  @IsOptional()
  name!: string;

  @ApiProperty({
    type: 'varchar',
    default: 'test@gmail.com',
    maxLength: 50,
    required: false,
  })
  @IsOptional()
  email!: string;

  @ApiProperty({
    type: 'varchar',
    default: '0123456789',
    maxLength: 20,
    required: false,
  })
  @IsOptional()
  phone!: string;

  @ApiProperty({
    type: 'varchar',
    default: 'Ha Noi',
    maxLength: 255,
    required: false,
  })
  @IsOptional()
  address!: string;

  @ApiProperty({
    type: 'varchar',
    default: 'https://www.facebook.com/',
    maxLength: 50,
    required: false,
  })
  @IsOptional()
  link!: string;


  @ApiProperty({
    type: 'varchar',
    default: 'Developer',
    maxLength: 1000,
    required: false,
  })
  @IsOptional()
  intent!: string;

  @ApiProperty({
    type: 'varchar',
    default: 'info_person',
    maxLength: 50,
    required: false,
  })
  @IsOptional()
  type!: string;

  @IsOptional()
  avatar!: string;

  @IsOptional()
  accountId!: string;

  @ApiProperty({
    type: 'array',
    items: { type: 'file', format: 'binary' },
    required: false,
  })
  @IsOptional()
  images!: any;

  @ApiProperty({
    type: 'int',
    default: 0,
    required: false,
    description: 'Default 0',
  })
  @IsOptional()
  row!: number;

  @ApiProperty({
    type: 'int',
    default: 0,
    required: false,
    description: 'Default 0',
  })
  @IsOptional()
  part!: number;

  @ApiProperty({
    type: 'int',
    default: 0,
    required: false,
    description: 'Default 0',
  })
  @IsOptional()
  col!: number;

  @ApiProperty({
    type: 'int',
    default: 0,
    required: false,
    description: 'Default 0',
  })
  @IsOptional()
  cvIndex!: number;

  
  @ApiProperty({
    type: 'int',
    default: 0,
    required: false,
    description: 'Default 0',
  })
  @IsOptional()
  padIndex!: number;
  
  @ApiProperty({
    type: 'varchar',
    default: 'https://www.facebook.com/',
    maxLength: 50,
    required: false,
  })
  @IsOptional()
  avatarPath!: string;

}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateServiceRecruitmentDto {

    id!: number;

    @ApiProperty({ type: 'string', required: true, maxLength: 255, default: 'Digital Marketing' })
    @IsNotEmpty()
    name!: string;

    @ApiProperty({ type: 'string', required: true, maxLength: 1000, default: 'We are looking for a digital marketing expert to help us with our marketing campaign.' })
    @IsNotEmpty()
    description!: string;

    @ApiProperty({ type: 'number', required: true, default: 0 })
    @IsNotEmpty()
    price!: number;

    @ApiProperty({ type: 'number', required: true, default: 0 })
    @IsNotEmpty()
    discount!: number;

    @ApiProperty({ type: 'number', required: true, default: 0 })
    @IsNotEmpty()
    expiration!: number;

    @ApiProperty({ type: 'number', required: true, default: 1 })
    @IsNotEmpty()
    status!: number;

    @ApiProperty({ type: 'string', required: false, default: 'V1' })
    @IsNotEmpty()
    type!: string;

    @IsOptional()
    icon!: string;

    @ApiProperty({ type: 'file', format: 'binary', required: true })
    @Transform(({ value }: { value: Express.Multer.File }) => value.originalname)
    @IsOptional()
    logo!: any | undefined;

    @ApiProperty({ type: 'array', items: { type: 'file', format: 'binary' }, required: false })
    @IsOptional()
    images!: [] | undefined;

    // array of string
    @IsOptional()
    @ApiProperty({ type: [String], default: [] })
    deleteImages?: string;
}

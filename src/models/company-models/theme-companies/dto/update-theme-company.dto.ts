import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateThemeCompanyDto {
    @IsOptional()
    accountId!:string;

    @ApiProperty({
        type: 'string',
        nullable: false,
        default: 'name'
    })
    @IsNotEmpty()
    name!: string;

    @ApiProperty({
        type: 'string',
        nullable: false,
        default: 'description'
    })
    @IsNotEmpty()
    description!: string;

    @IsOptional()
    logo!: string;

    @IsOptional()
    image!: string;

    @ApiProperty({
        type: 'string',
        nullable: false,
        default: 'link'
    })
    @IsNotEmpty()
    link!: string;

    @ApiProperty({
        type: 'string',
        nullable: false,
        default: 'nameButton'
    })
    @IsNotEmpty()
    nameButton!: string;


    @ApiProperty({ type: 'file', format: 'binary', required: true })
    @Transform(({ value }: { value: Express.Multer.File }) => value.originalname)
    @IsOptional()
    logoData!: any | undefined;

    @ApiProperty({ type: 'file', format: 'binary', required: true })
    @Transform(({ value }: { value: Express.Multer.File }) => value.originalname)
    @IsOptional()
    imageData!: any | undefined;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class RecruiterSignUpDto {

    @ApiProperty({
        type: 'varchar',
        nullable: false,
        default: 'email@gmail.com',
        maxLength: 255
    })
    @IsNotEmpty()
    email!: string;

    @ApiProperty({
        type: 'varchar',
        nullable: false,
        default: '123456',
    })
    @IsNotEmpty()
    password!: string;


    logo!: string;

    @ApiProperty({
        type: 'varchar',
        nullable: false,
        default: 'name company',
        maxLength: 255
    })
    @IsNotEmpty()
    name!: string;

    @ApiProperty({
        type: 'varchar',
        nullable: false,
        default: 'tax code',
        maxLength: 255
    })
    @IsOptional()
    taxCode!: string;


    @ApiProperty({
        type: 'number',
        nullable: false,
        default: 37,
    })
    @IsNotEmpty()
    companyRoleId!: number;

    @ApiProperty({
        type: 'varchar',
        nullable: false,
        default: 'website.com',
        maxLength: 255
    })
    @IsNotEmpty()
    website!: string;


    @ApiProperty({
        type: 'varchar',
        nullable: false,
        default: 'phone number',
        maxLength: 255
    })
    @IsNotEmpty()
    phone!: string;

    @ApiProperty({
        type: 'varchar',
        nullable: false,
        default: '1',
        description: 'wardId of address'
    })
    @IsNotEmpty()
    wardId!: string;

    @ApiProperty({
        type: 'varchar',
        nullable: false,
        default: 'address',
        maxLength: 255
    })
    @IsNotEmpty()
    address!: string;


    @ApiProperty({
        type: 'number',
        nullable: false,
        default: 1,
    })
    @IsNotEmpty()
    categoryId!: number;

    @ApiProperty({
        type: 'number',
        nullable: false,
        default: 1,
    })
    @IsNotEmpty()
    companySizeId!: number;

    @ApiProperty({
        type: 'varchar',
        nullable: false,
        default: 'description',
        maxLength: 1000
    })
    @IsNotEmpty()
    description!: string;


    @ApiProperty({ type: 'array', items: { type: 'file', format: 'binary' }, required: false })
    @IsOptional()
    logoFile!: any;
}
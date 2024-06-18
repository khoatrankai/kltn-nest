import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateProfilesCvDto {

    accountId!: string;

    image!: string;

    imageBuffer!: Buffer

    path!: string;

    @ApiProperty({ type: 'varchar', maxLength: 255, nullable: false, default: 'HBT CV' })
    @IsNotEmpty()
    name!: string;

    @ApiProperty({ type: 'int', nullable: false, default: 0 })
    @IsNotEmpty()
    cvIndex!: number;

    @ApiProperty({ type: 'int', nullable: false, default: 0 })
    @IsNotEmpty()
    templateId!: number;

    @ApiProperty({ type: 'file', nullable: false })
    file!: any


    @ApiProperty({
        type: 'file',
        required: false,
    })
    @IsOptional()
    images!: string[] | undefined;
    
    @ApiProperty({ type: 'int', nullable: false, default: 0, description: '0: no use images, 1: use images' })
    @IsNotEmpty()
    type!: number;

    @ApiProperty({ type: 'int', nullable: false, default: 0, description: '0: from application, 1: from device' })
    @IsOptional()
    device!: number;

}

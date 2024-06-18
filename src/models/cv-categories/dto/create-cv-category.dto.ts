import { ApiProperty } from "@nestjs/swagger";

export class CreateCvCategoryDto {


    @ApiProperty({
        type: 'number',
        description: 'Cv index',
        default: 1
    })
    cvIndex!: number;

    @ApiProperty({
        type: 'number',
        description: 'Parent category id',
        default: 1
    })
    parentCategoryId!: number;

    @ApiProperty({
        type: 'string',
        description: 'Ward id',
        default: '00001'
    })
    wardId!: string;

    @ApiProperty({
        type: 'number',
        description: 'Percent',
        default: 10
    })
    percent!: number;
}

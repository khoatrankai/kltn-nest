import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCvLayoutDto {
    
    accountId!:string;

    @ApiProperty({
        description: 'The index of the CV',
        type: Number,
        example: 1
    })
    @IsNotEmpty()
    cvIndex!: number;

    @ApiProperty({
        description: 'The layout of the CV',
        type: [String],
        example: ['layout1', 'layout2', 'layout3']
    })
    @IsNotEmpty()
    layout!: string[];
    
    @ApiProperty({
        description: 'The color of the CV',
        type: [String],
        example: ['color1', 'color2', 'color3']
    })
    @IsNotEmpty()
    color!: string[];

    @ApiProperty({
        description: 'The padding of the CV',
        type: [String],
        example: ['pad1', 'pad2', 'pad3']
    })
    @IsNotEmpty()
    pad!: string[];

    @ApiProperty({
        description: 'The padding part of the CV',
        type: [String],
        example: ['padPart1', 'padPart2', 'padPart3']
    })
    @IsNotEmpty()
    padPart!: string[];


    @ApiProperty({
        description: 'The color of the text',
        type: [String],
        example: ['colorText1', 'colorText2', 'colorText3']
    })
    @IsNotEmpty()
    colorText!: string[];

    @ApiProperty({
        type: 'varchar',
        nullable: false,
        default: 'color of the topic',
        maxLength: 255,
    })
    @IsNotEmpty()
    colorTopic!: string;

    @ApiProperty({
        type: 'int',
        default: 0,
        nullable: false,
    })
    @IsNotEmpty()
    indexTopic!: number;
}

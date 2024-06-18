import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, ArrayMinSize, IsNotEmpty } from "class-validator";


export class DeleteProfilesCvDto {

    accountId!:string;

    @ApiProperty({ type: "array", items: { type: "number" } })
    @IsNumber({}, { each: true })
    @ArrayMinSize(1)
    @IsNotEmpty()
    ids!: number[];
}
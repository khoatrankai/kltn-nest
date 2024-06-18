import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateMoreCvProjectDto {

    @IsNotEmpty()
    cvProjectId!: number;

    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    time!: string;

    @IsNotEmpty()
    link!: string;

    @IsNotEmpty()
    participant!: string;

    @IsNotEmpty()
    position!: string;

    @IsNotEmpty()
    functionality!: string;

    @IsNotEmpty()
    technology!: string;

    @IsOptional()
    index!: number;

}

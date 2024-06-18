import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateMoreCvExtraInformationDto {

    @IsNotEmpty()
    cvExtraInformationId!: number;

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

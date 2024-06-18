import { IsOptional } from "class-validator";

export class CreateMoreCvInformationDto {

    @IsOptional()
    cvInformationId!: number;

    @IsOptional()
    content!: string;

    @IsOptional()
    padIndex!: number;
}

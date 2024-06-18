import { IsOptional } from "class-validator";

export class CreateServiceRecruitmentImageDto {

    @IsOptional()
    serviceRecruitmentId!: number;

    @IsOptional()
    image!: string;

    @IsOptional()
    status!: number;
}

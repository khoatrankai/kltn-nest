import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceRecruitmentImageDto } from './create-service-recruitment-image.dto';

export class UpdateServiceRecruitmentImageDto extends PartialType(CreateServiceRecruitmentImageDto) {}

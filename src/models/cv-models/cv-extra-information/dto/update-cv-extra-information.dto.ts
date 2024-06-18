import { PartialType } from '@nestjs/mapped-types';
import { CreateCvExtraInformationDto } from './create-cv-extra-information.dto';

export class UpdateCvExtraInformationDto extends PartialType(CreateCvExtraInformationDto) {}

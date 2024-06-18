import { PartialType } from '@nestjs/mapped-types';
import { CreateCvLayoutDto } from './create-cv-layout.dto';

export class UpdateCvLayoutDto extends PartialType(CreateCvLayoutDto) {}

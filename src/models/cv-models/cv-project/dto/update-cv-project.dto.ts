import { PartialType } from '@nestjs/mapped-types';
import { CreateCvProjectDto } from './create-cv-project.dto';

export class UpdateCvProjectDto extends PartialType(CreateCvProjectDto) {}

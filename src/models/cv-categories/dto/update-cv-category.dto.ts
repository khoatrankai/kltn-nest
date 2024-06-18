import { PartialType } from '@nestjs/mapped-types';
import { CreateCvCategoryDto } from './create-cv-category.dto';

export class UpdateCvCategoryDto extends PartialType(CreateCvCategoryDto) {}

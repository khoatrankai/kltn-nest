import { PartialType } from '@nestjs/swagger';
import { CreateProfilesCategoryDto } from './create-profiles-category.dto';

export class UpdateProfilesCategoryDto extends PartialType(CreateProfilesCategoryDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyRatingDto } from './create-company-rating.dto';

export class UpdateCompanyRatingDto extends PartialType(CreateCompanyRatingDto) {}

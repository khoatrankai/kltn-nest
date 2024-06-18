import { PartialType } from '@nestjs/swagger';
import { CreateCompanySizeDto } from './create-company-size.dto';

export class UpdateCompanySizeDto extends PartialType(CreateCompanySizeDto) {}

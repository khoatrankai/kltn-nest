import { PartialType } from '@nestjs/swagger';
import { CreateSalaryTypeDto } from './create-salary-type.dto';

export class UpdateSalaryTypeDto extends PartialType(CreateSalaryTypeDto) {}

import { PartialType } from '@nestjs/swagger';
import { CreateAcademicTypeDto } from './create-academic_type.dto';

export class UpdateAcademicTypeDto extends PartialType(CreateAcademicTypeDto) {

    id!:number;
}

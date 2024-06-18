import { PartialType } from '@nestjs/swagger';
import { CreateCompanyImageDto } from './create-company-image.dto';

export class UpdateCompanyImageDto extends PartialType(CreateCompanyImageDto) {

}

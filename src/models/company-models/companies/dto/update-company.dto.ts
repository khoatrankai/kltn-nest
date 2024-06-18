import { PartialType } from '@nestjs/swagger';
import { CreateCompanyDto } from './create-company.dto';
export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
    validate() {
        if (
            !this.name &&
            !this.address &&
            !this.website &&
            !this.description &&
            !this.phone &&
            !this.email &&
            !this.companyRoleId &&
            !this.companySizeId &&
            !this.categoryId &&
            !this.wardId &&
            !this.logo && 
            !this.taxCode
        ) {
            return false;
        }
        return true;
    }
}

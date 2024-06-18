import { Exclude, Expose } from 'class-transformer';
import { Company } from '../entities/company.entity';
import { CompanyImage } from '../../company-images/entities/company-image.entity';
import { CompanyRole } from '../../company-roles/entities/company-role.entity';
import { Ward } from 'src/models/locations/wards/entities';
import { ParentCategory } from 'src/models/categories/parents/entities/parent.entity';
import { CompanySize } from '../../company-sizes/entities/company-size.entity';
import {
  BUCKET_IMAGE_COMPANIES,
  BUCKET_IMAGE_COMPANIES_LOGO,
} from 'src/common/constants';
import { Language } from 'src/common/enum';
import { FollowCompany } from '../../follow-companies/entities/follow-company.entity';
import { CompanyRoleSerialization } from '../../company-roles/serialization/company-role.serializarion';
import { CompanySizeSerialization } from '../../company-sizes/serialization/company-size.serialization';
import { locationTranslator } from 'src/common/helper/translators';

export class DetailCompanySerialization extends Company {
  @Exclude({ toPlainOnly: true })
  lang!: Language;

  constructor(company: Company, lang: Language) {
    super();
    this.lang = lang;
    Object.assign(this, company);
  }

  @Exclude({ toPlainOnly: true })
  override accountId!: string;

  @Exclude({ toPlainOnly: true })
  override wardId!: string;

  @Exclude({ toPlainOnly: true })
  override companyRoleId!: number;

  @Exclude({ toPlainOnly: true })
  override companySizeId!: number;

  @Exclude({ toPlainOnly: true })
  override categoryId!: number;

  @Exclude({ toPlainOnly: true })
  override createdAt!: any;

  @Exclude({ toPlainOnly: true })
  override updatedAt!: any;

  @Exclude({ toPlainOnly: true })
  override companyImages!: CompanyImage[];

  @Exclude({ toPlainOnly: true })
  override companyRole!: CompanyRole;

  @Exclude({ toPlainOnly: true })
  override ward!: Ward;

  @Exclude({ toPlainOnly: true })
  override category!: ParentCategory;

  @Exclude({ toPlainOnly: true })
  override companySize!: CompanySize;

  @Exclude({ toPlainOnly: true })
  override logo!: string;

  @Exclude({ toPlainOnly: true })
  override followCompanies!: FollowCompany[]

  @Expose()
  get images() {
    if (!this.companyImages) return [];
    return this.companyImages.map((image) => {
      return {
        id: image.id,
        image: BUCKET_IMAGE_COMPANIES + '/' + this.id + '/' + image.image,
      };
    });
  }

  @Expose()
  get wardData() {
    switch (this.lang) {
      case Language.EN:
        return this.ward?.fullNameEn;
      case Language.VI:
        return this.ward?.fullName;
      default:
        return this.ward?.fullName;
    }
  }

  @Expose() 
  get companyLocation() {
    if (!this.ward) return null;
    return locationTranslator(this.ward, this.lang);
  }

  @Expose()
  get companySizeInfomation() {
    if (!this.companySize) return null;
    return new CompanySizeSerialization(this.companySize, this.lang);
  }

  @Expose()
  get categoryData() {
    switch (this.lang) {
      case Language.EN:
        return this.category?.nameEn;
      case Language.VI:
        return this.category?.name;
      default:
        return this.category?.nameKor;
    }
  }

  @Expose()
  get logoPath() {
    if (!this.logo) return null;
    return `${BUCKET_IMAGE_COMPANIES_LOGO}/${this.id}/${this.logo}`;
  }

  @Expose()
  get companyCategory() {
    if (!this.category) return null;
    return {
      id: this.category.id,
      fullName: this.category.name,
    };
  }

  @Expose()
  get isFollowed() {
    return this.followCompanies?.length > 0;
  }

  @Expose()
  get companyRoleInfomation() {
    if (!this.companyRole) return null;
    return new CompanyRoleSerialization(this.companyRole, this.lang);
  }
}

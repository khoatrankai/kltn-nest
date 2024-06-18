import { Exclude, Expose, Transform } from 'class-transformer';
import { BUCKET_IMAGE_AVATAR } from 'src/common/constants';
import { Language } from 'src/common/enum';
import {
  categoryTranslator,
  genderTranslator, locationTranslator,
} from 'src/common/helper/translators';
import { birthdayTraslator } from 'src/common/helper/translators/birthday.translator';
import { AcedemicTypesSerialization } from 'src/models/academic_types/serialization/acedemic_types.serialization';
import { ChildCategory } from 'src/models/categories/children/entities/child.entity';
import { ProfilesEducation } from 'src/models/profile-models/profiles-educations/entities/profiles-education.entity';
import { Profile } from 'src/models/profile-models/profiles/entities';
import { filter } from '../transform/cv-filter.transform';
import { Province } from 'src/models/locations/provinces/entities';

export class CVFilterSerialization extends Profile {
  @Exclude()
  lang: Language;

  constructor(profile: Profile, lang: Language) {
    super();
    Object.assign(this, profile);
    this.lang = lang;
  }

  @Exclude({ toPlainOnly: true })
  override introduction!: string;

  @Exclude({ toPlainOnly: true })
  override gender!: number;

  @Exclude({ toPlainOnly: true })
  override linkedin!: string;

  @Exclude({ toPlainOnly: true })
  override facebook!: string;

  @Exclude({ toPlainOnly: true })
  override createdAt!: Date;

  @Transform(({ value }) => value?.getTime())
  override updatedAt!: Date;

  @Exclude({ toPlainOnly: true })
  override isSearch!: number;

  @Exclude({ toPlainOnly: true })
  override jobTypeId!: number;

  @Exclude({ toPlainOnly: true })
  override jobTypeName!: string;

  @Exclude({ toPlainOnly: true })
  override childCategories!: ChildCategory[];

  @Exclude({ toPlainOnly: true })
  override profilesLocations!: any[];

  @Exclude({ toPlainOnly: true })
  override profilesEducations!: ProfilesEducation[];

  @Exclude({ toPlainOnly: true })
  override birthday!: string;

  @Exclude({ toPlainOnly: true })
  override address!: string;

  @Exclude({ toPlainOnly: true })
  override phone!: string;

  @Exclude({ toPlainOnly: true })
  override email!: string;

  @Exclude({ toPlainOnly: true })
  override avatar!: string;

  @Exclude({ toPlainOnly: true })
  override cvUrl!: string;

  @Exclude({ toPlainOnly: true })
  override province!:Province;

  @Expose()
  get categoriesData() {
    if (!this.childCategories) return null;
    return this.childCategories.map((category) => {
      return categoryTranslator(category, this.lang);
    });

  }

  @Expose()
  get profilesLocationsData() {
    if (!this.profilesLocations) return null;
    return this.profilesLocations.map((location) => {
      return locationTranslator(location, this.lang);
    });
  }

  @Expose()
  get profilesEducationsData() {
    if (!this.profilesEducations) return null;
    const result = this.profilesEducations.map((education) => {
      return new AcedemicTypesSerialization(education.academicType, this.lang);
    });
    return filter(result)
  }

  @Expose()
  get genderData() {
    if (this.gender !== 0 && this.gender !== 1) return null;
    return genderTranslator(this.gender, this.lang);
  }

  @Expose()
  get imageData() {
    if (!this.avatar) return null;
    return {
      avatar: this.avatar ? `${BUCKET_IMAGE_AVATAR}/${this.avatar}` : null,
    }
  }

  @Expose()
  get birthdayData() {
    if (!this.birthday) return null;
    return birthdayTraslator(+this.birthday);
  }
}

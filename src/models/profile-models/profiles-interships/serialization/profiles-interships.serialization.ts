import { Language } from 'src/common/enum';
import { ProfilesIntership } from '../entities/profiles-intership.entity';
import { Exclude, Transform } from 'class-transformer';

export class ProfilesIntershipSerialization extends ProfilesIntership {
  @Exclude({ toPlainOnly: true })
  lang: Language;

  constructor(profilesIntership: ProfilesIntership, lang: Language) {
    super();
    this.lang = lang;
    Object.assign(this, profilesIntership);
  }

  @Exclude({ toPlainOnly: true })
  override accountId!: string;

  @Transform(({ value }) => (value ? +value : null))
  override startDate!: string;

  @Transform(({ value }) => (value ? +value : null))
  override endDate!: string;
}

import { Language } from 'src/common/enum';
import { ProfilesCv } from '../entities/profiles_cv.entity';
import { Exclude, Expose, Transform } from 'class-transformer';
import { BUCKET_CV } from 'src/common/constants';

export class ProfilesCvsSerialization extends ProfilesCv {
  @Exclude()
  lang: Language;

  constructor(profilesCv: ProfilesCv, lang: Language) {
    super();
    Object.assign(this, profilesCv);
    this.lang = lang;
  }

  @Exclude({ toPlainOnly: true })
  override accountId!: string;

  @Exclude({ toPlainOnly: true })
  override image!: string;

  @Exclude({ toPlainOnly: true })
  override path!: string;

  @Transform(({ value }) => new Date(value).getTime())
  override createdAt!: Date;

  @Transform(({ value }) => new Date(value).getTime())
  override updatedAt!: Date;

  @Expose()
  get imageURL() {
    return BUCKET_CV + '/' + this.accountId + '/' + this.image;
  }

  @Expose()
  get pdfURL() {
    return BUCKET_CV + '/' + this.accountId + '/' + this.path;
  }
}

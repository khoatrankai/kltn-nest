import { BUCKET_IMAGE_AVATAR } from 'src/common/constants';
import { CommunicationLike } from '../entities/communication-like.entity';
import { Language } from 'src/common/enum';
// import timeToTextTransform from 'src/common/helper/transform/timeToText.transform';
import { Exclude, Expose } from 'class-transformer';
import timeToTextTransform from 'src/common/helper/transform/timeToText.transform';
import { Profile } from 'src/models/profile-models/profiles/entities';

export class CommunicationLikeSerialization extends CommunicationLike {
  @Exclude({ toPlainOnly: true })
  lang!: Language;

  constructor(communicationLike: CommunicationLike, lang: Language) {
    super();
    this.lang = lang;
    Object.assign(this, communicationLike);
  }

  @Exclude({ toPlainOnly: true })
  override accountId!: string;

  @Exclude({ toPlainOnly: true })
  override createdAt!: Date;

  @Exclude({ toPlainOnly: true })
  override profile!: Profile;

  @Expose()
  get createdAtText() {
    return timeToTextTransform(this.createdAt.getTime(), this.lang);
  }

  @Expose()
  get avatar() {
    return (this.profile && this.profile?.avatar)
      ? `${BUCKET_IMAGE_AVATAR}/${this.profile.avatar}`
      : null;
  }

  @Expose()
  get name() {
    return this.profile ? this.profile.name : null;
  }
}

import { BUCKET_IMAGE_AVATAR } from 'src/common/constants';
import { CommunicationView } from '../entities/communication-view.entity';
import { timeToTextTransform } from 'src/common/helper/transform/timeToText.transform';
import { Language } from 'src/common/enum';
import { Exclude, Expose } from 'class-transformer';
import { Profile } from 'src/models/profile-models/profiles/entities';

export class CommunicationViewSerialization extends CommunicationView {

  @Exclude({ toPlainOnly: true })
  lang!: Language;

  constructor(communicationView: CommunicationView, lang: Language) {
    super();
    this.lang = lang;
    Object.assign(this, communicationView);
  }

  @Expose({ toPlainOnly: true })
  override communicationId!: number;

  @Exclude({ toPlainOnly: true })
  override createdAt!: Date;

  @Exclude({ toPlainOnly: true })
  override accountId!: string;

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

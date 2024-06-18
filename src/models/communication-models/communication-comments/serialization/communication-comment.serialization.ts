import { Language } from 'src/common/enum';
import { CommunicationComment } from '../entities/communication-comment.entity';
import {
  BUCKET_IMAGE_AVATAR,
  BUCKET_IMAGE_COMMUNICATION_COMMENT,
} from 'src/common/constants';
import { Exclude, Expose } from 'class-transformer';
import { CommunicationCommentImage } from '../../communication-comment-images/entities/communication-comment-image.entity';
import { Profile } from 'src/models/profile-models/profiles/entities';
import timeToTextTransform from 'src/common/helper/transform/timeToText.transform';

export class CommunicationCommentSerialization extends CommunicationComment {
  @Exclude({ toPlainOnly: true })
  lang!: Language;

  constructor(communicationComment: CommunicationComment, lang: Language) {
    super();
    this.lang = lang;
    Object.assign(this, communicationComment);
  }

  @Exclude({ toPlainOnly: true })
  override communicationId!: number;

  @Exclude({ toPlainOnly: true })
  override accountId!: string;

  @Exclude({ toPlainOnly: true })
  override parentCommentId!: number;

  @Exclude({ toPlainOnly: true })
  override createdAt!: Date;

  @Exclude({ toPlainOnly: true })
  override updatedAt!: Date;

  @Exclude({ toPlainOnly: true })
  override communicationCommentImages!: CommunicationCommentImage[];

  @Exclude({ toPlainOnly: true })
  override profile!: Profile;

  @Expose()
  get createdAtText() {
    return timeToTextTransform(this.createdAt.getTime(), this.lang);
  }

  @Expose()
  get profileData() {
    return {
      name: this.profile ? this.profile.name : null,
      avatar: (this.profile && this.profile?.avatar)
        ? `${BUCKET_IMAGE_AVATAR}/${this.profile.avatar}`
        : null,
    };
  }

  @Expose()
  get communicationCommentImagesData() {
    if (!this.communicationCommentImages) return null;
    return this.communicationCommentImages.map(
      (image) =>
        `${BUCKET_IMAGE_COMMUNICATION_COMMENT}/${this.id}/communications/${this.communicationId}/${image.image}`,
    );
  }
}

import { Language } from 'src/common/enum';
import { Communication } from '../entities/communication.entity';
import { Exclude, Expose, Transform } from 'class-transformer';
import {
  BUCKET_IMAGE_AVATAR,
  BUCKET_IMAGE_COMMUNICATION,
} from 'src/common/constants';
import { CommunicationLike } from '../../communication-likes/entities/communication-like.entity';
import { CommunicationComment } from '../../communication-comments/entities/communication-comment.entity';
import { CommunicationCategory } from '../../communication-categories/entities/communication.entity';
import { CommunicationImage } from '../../communication-images/entities/communication-image.entity';
import { Profile } from 'src/models/profile-models/profiles/entities';
import { CommunicationView } from '../../communication-views/entities/communication-view.entity';
import timeToTextTransform from 'src/common/helper/transform/timeToText.transform';
import { CommunicationBookmarked } from '../../communication-bookmarked/entities/communication-bookmarked.entity';

export class CommunicationSerialization extends Communication {
  @Exclude({ toPlainOnly: true })
  lang!: Language;

  @Exclude({ toPlainOnly: true })
  check: boolean;

  constructor(
    communication: Communication,
    lang: Language,
    check: boolean = false,
  ) {
    super();
    this.lang = lang;
    this.check = check;
    Object.assign(this, communication);
  }

  @Exclude({ toPlainOnly: true })
  override accountId!: string;

  @Exclude({ toPlainOnly: true })
  override status!: number;

  @Transform(({ value }) => new Date(value).getTime())
  override createdAt!: Date;

  @Expose()
  get createdAtText() {
    return timeToTextTransform(this.createdAt.getTime(), this.lang);
  }

  @Exclude({ toPlainOnly: true })
  override updatedAt!: Date;

  @Exclude({ toPlainOnly: true })
  override communicationLikes!: CommunicationLike[];

  @Exclude({ toPlainOnly: true })
  override communicationComments!: CommunicationComment[];

  @Exclude({ toPlainOnly: true })
  override communicationCategories!: CommunicationCategory[];

  @Exclude({ toPlainOnly: true })
  override communicationImages!: CommunicationImage[];

  @Exclude({ toPlainOnly: true })
  override profile!: Profile;

  @Exclude({ toPlainOnly: true })
  override communicationViews!: CommunicationView[];

  @Exclude({ toPlainOnly: true })
  override communicationBookmarked!: CommunicationBookmarked[];

  @Expose()
  get profileData() {
    return {
      id : this.profile.accountId,
      name: this.profile ? this.profile.name : null,
      avatarPath: (this.profile && this.profile?.avatar)
        ? `${BUCKET_IMAGE_AVATAR}/${this.profile.avatar}`
        : null,
    };
  }

  @Expose()
  get images() {
    if (!this.communicationImages) return null;
    const data = this.communicationImages.map((image: any) => {
      return {
        id: image.id,
        image: `${BUCKET_IMAGE_COMMUNICATION}/${this.id}/${image.image}`,
      };
    });

    return data;
  }

  @Expose()
  get bookmarked() {
    return this.communicationBookmarked?.length > 0 || this.check
      ? true
      : false;
  }

  @Expose()
  get liked() {
    return this.communicationLikes?.length > 0 ? true : false;
  }

  @Expose()
  get viewd() {
    return this.communicationViews?.length > 0 ? true : false;
  }
}

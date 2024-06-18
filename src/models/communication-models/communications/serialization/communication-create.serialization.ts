import { Language } from 'src/common/enum';
import { Communication } from '../entities/communication.entity';
import { Exclude, Expose, Transform } from 'class-transformer';
import { CommunicationLike } from '../../communication-likes/entities/communication-like.entity';
import { CommunicationComment } from '../../communication-comments/entities/communication-comment.entity';
import { CommunicationCategory } from '../../communication-categories/entities/communication.entity';
import { CommunicationImage } from '../../communication-images/entities/communication-image.entity';
import { Profile } from 'src/models/profile-models/profiles/entities';
import { CommunicationView } from '../../communication-views/entities/communication-view.entity';
import timeToTextTransform from 'src/common/helper/transform/timeToText.transform';

export class CommunicationCreateSerialization extends Communication {
  @Exclude({ toPlainOnly: true })
  lang!: Language;

  constructor(communication: Communication, lang: Language) {
    super();
    this.lang = lang;
    Object.assign(this, communication);
  }

  @Exclude({ toPlainOnly: true })
  override accountId!: string;

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

  @Expose({ toPlainOnly: true })
  get totalLikes() {
    return this.communicationLikes.length;
  }

  @Expose({ toPlainOnly: true })
  get totalViews() {
    return this.communicationViews.length;
  }

  @Expose({ toPlainOnly: true })
  get totalComments() {
    return this.communicationComments.length;
  }
}

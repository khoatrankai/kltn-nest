import { Exclude, Expose } from 'class-transformer';
import { CommunicationBookmarked } from '../entities/communication-bookmarked.entity';
import { Communication } from '../../communications/entities/communication.entity';
import { CommunicationSerialization } from '../../communications/serialization/communication.serialization';
import { Language } from 'src/common/enum';

export class CommunicationBookmarkedSerialization extends CommunicationBookmarked {
  @Exclude({ toPlainOnly: true })
  lang!: Language;

  constructor(
    communicationBookmarked: CommunicationBookmarked,
    lang: Language,
  ) {
    super();
    this.lang = lang;
    Object.assign(this, communicationBookmarked);
  }

  @Exclude({ toPlainOnly: true })
  override communicationId!:number;

  @Exclude({ toPlainOnly: true })
  override accountId!: string;

  @Exclude({ toPlainOnly: true })
  override createdAt!: Date;

  @Exclude({ toPlainOnly: true })
  override communication!: Communication;

  @Expose()
  get communicationData() {
    return Object.assign(
      new CommunicationSerialization(this.communication, this.lang, true),
    );
  }
}

import {
  // AfterLoad,
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommunicationImage } from '../../communication-images/entities/communication-image.entity';
import { CommunicationCategory } from '../../communication-categories/entities/communication.entity';
import { Profile } from 'src/models/profile-models/profiles/entities';
import { CommunicationLike } from '../../communication-likes/entities/communication-like.entity';
import { CommunicationView } from '../../communication-views/entities/communication-view.entity';
import { CommunicationComment } from '../../communication-comments/entities/communication-comment.entity';
import { CommunicationBookmarked } from '../../communication-bookmarked/entities/communication-bookmarked.entity';

@Entity('communications')
export class Communication extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: false, name: 'account_id' })
  accountId!: string;

  @Column({ type: 'varchar', length: 500, nullable: false, name: 'title' })
  title!: string;

  @Column({ type: 'text', nullable: false, name: 'content' })
  content!: string;

  @Column({ type: 'tinyint', nullable: false, name: 'status', default: 1 })
  status!: number;

  @Column({ type: 'tinyint', nullable: false, name: 'type', default: 1})
  type!:number;

  @Column({
    type: 'datetime',
    nullable: false,
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Column({
    type: 'datetime',
    nullable: false,
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @OneToMany(
    () => CommunicationImage,
    (communicationImage) => communicationImage.communication,
  )
  communicationImages!: CommunicationImage[];

  @OneToMany(
    () => CommunicationCategory,
    (communicationCategory) => communicationCategory.communication,
  )
  communicationCategories!: CommunicationCategory[];

  @ManyToOne(() => Profile, (profile) => profile.communications)
  @JoinColumn({ name: 'account_id', referencedColumnName: 'accountId' })
  profile!: Profile;

  @OneToMany(
    () => CommunicationLike,
    (communicationLike) => communicationLike.communication,
  )
  communicationLikes!: CommunicationLike[];

  @OneToMany(
    () => CommunicationView,
    (communicationView) => communicationView.communication,
  )
  communicationViews!: CommunicationView[];

  @OneToMany(
    () => CommunicationComment,
    (communicationComment) => communicationComment.communications,
  )
  communicationComments!: CommunicationComment[];

  @OneToMany(() => CommunicationBookmarked, communicationBookmarked => communicationBookmarked.communication)
  communicationBookmarked!: CommunicationBookmarked[];

  communicationLikesCount!: any;

  communicationViewsCount!: number;

  communicationCommentsCount!: number;

  // @AfterLoad()
  // async countCommunicationComments() {
  //   this.communicationCommentsCount = await Communication.createQueryBuilder(
  //     'communication',
  //   )
  //     .innerJoinAndSelect(
  //       'communication.communicationComments',
  //       'communicationComments',
  //     )
  //     .where('communication.id = :id', { id: this.id })
  //     .getCount();
  // }

  // @AfterLoad()
  // async countCommunicationLikes() {
  //   this.communicationLikesCount = await Communication.createQueryBuilder(
  //     'communication',
  //   )
  //     .innerJoinAndSelect('communication.communicationLikes', 'communicationLikes')
  //     .where('communication.id = :id', { id: this.id })
  //     .getCount();
  // }

  // @AfterLoad()
  // async countCommunicationViews() {
  //   this.communicationViewsCount = await Communication.createQueryBuilder(
  //     'communication',
  //   )
  //     .innerJoinAndSelect('communication.communicationViews', 'communicationViews')
  //     .where('communication.id = :id', { id: this.id })
  //     .getCount();
  // }
}

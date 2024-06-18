import { Profile } from 'src/models/profile-models/profiles/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommunicationCommentImage } from '../../communication-comment-images/entities/communication-comment-image.entity';
import { Communication } from '../../communications/entities/communication.entity';

@Entity('communication_comments')
export class CommunicationComment {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'int', nullable: false, name: 'communication_id' })
  communicationId!: number;

  @Column({ type: 'varchar', length: 50, nullable: false, name: 'account_id' })
  accountId!: string;

  @Column({ type: 'text', nullable: false, name: 'content' })
  content!: string;

  @Column({
    type: 'int',
    nullable: false,
    name: 'parent_comment_id',
    default: 0,
  })
  parentCommentId!: number;

  @Column({ type: 'tinyint', nullable: false, name: 'status', default: 1 })
  status!: number;

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

  // sub comments
  @OneToMany(
    () => CommunicationComment,
    (communicationComment: CommunicationComment) =>
      communicationComment.parentCommentId,
  )
  subComments!: CommunicationComment[];

  @ManyToOne(() => Profile, (profile) => profile.communicationComments)
  @JoinColumn({name: 'account_id'})
  profile!: Profile;

  @OneToMany(() => CommunicationCommentImage, communicationCommentImage => communicationCommentImage.communicationComment)
  communicationCommentImages!: CommunicationCommentImage[];

  @ManyToOne(() => Communication, communication => communication.communicationComments)
  @JoinColumn({name: 'communication_id'})
  communications!: Communication;
}

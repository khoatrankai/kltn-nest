import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Communication } from '../../communications/entities/communication.entity';
import { User } from 'src/models/user-model/users/entities';

@Entity('communication_bookmarked')
export class CommunicationBookmarked {
  @PrimaryColumn({ type: 'int', nullable: false, name: 'communication_id' })
  communicationId!: number;

  @PrimaryColumn({
    type: 'varchar',
    length: 50,
    nullable: false,
    name: 'account_id',
  })
  accountId!: string;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'account_id' })
  user: User | undefined;

  @ManyToOne(() => Communication, (communication) => communication.id)
  @JoinColumn({ name: 'communication_id' })
  communication: Communication | undefined;

  communicationLikesCount!: any;

  communicationViewsCount!: number;

  communicationCommentsCount!: number;
}

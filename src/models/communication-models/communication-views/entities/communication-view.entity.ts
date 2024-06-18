import { Profile } from 'src/models/profile-models/profiles/entities';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Communication } from '../../communications/entities/communication.entity';

@Entity('communication_views')
export class CommunicationView {
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

  @ManyToOne(() => Profile, profile => profile.communicationLikes) 
  @JoinColumn({ name: 'account_id', referencedColumnName: 'accountId' })
  profile!: Profile;

  @ManyToOne(() => Communication, communication => communication.communicationViews)
  @JoinColumn({name: 'communication_id'})
  communication!: Communication
}

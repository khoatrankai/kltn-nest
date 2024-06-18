import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from '../../profiles/entities';

@Entity('profiles_activities')
export class ProfilesActivity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'account_id', type: 'varchar', nullable: false, length: 50 })
  accountId!: string;

  @Column({ name: 'title', type: 'varchar', nullable: false, length: 255 })
  title!: string;

  @Column({
    name: 'organization',
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  organization!: string;

  @Column({
    type: 'text',
    nullable: false,
    name: 'description',
  })
  description!: string;

  @Column({ type: 'varchar', length: 20, default: null, name: 'start_date' })
  startDate!: string;

  @Column({ type: 'varchar', length: 20, default: null, name: 'end_date' })
  endDate!: string;

  @ManyToOne(() => Profile, (profile) => profile.profilesActivity)
  @JoinColumn({ name: 'account_id', referencedColumnName: 'accountId' })
  profile!: Profile;
}

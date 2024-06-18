import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from '../../profiles/entities';

@Entity('profiles_awards')
export class ProfilesAward {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, name: 'account_id', nullable: false })
  accountId!: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'award_title',
    nullable: false,
  })
  title!: string;

  @Column({
    type: 'text',
    nullable: false,
    name: 'description',
  })
  description!: string;

  @ManyToOne(() => Profile, (profile) => profile.profilesAward)
  @JoinColumn({ name: 'account_id', referencedColumnName: 'accountId' })
  profile!: Profile;
}

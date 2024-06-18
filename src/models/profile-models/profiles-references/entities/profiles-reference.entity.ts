import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';

@Entity('profiles_references')
export class ProfilesReference {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: false, name: 'account_id' })
  accountId!: string;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'full_name' })
  fullName!: string;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'phone' })
  phone!: string;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'email' })
  email!: string;

  @Column({
    type: 'text',
    nullable: false,
    name: 'description',
  })
  description!: string;

  @ManyToOne(() => Profile, (profile) => profile.profilesReference)
  @JoinColumn({ name: 'account_id', referencedColumnName: 'accountId' })
  profile!: Profile;
}

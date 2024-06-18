import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from '../../profiles/entities';

@Entity('profiles_interships')
export class ProfilesIntership {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, name: 'account_id', nullable: true })
  accountId!: string;

  @Column({ type: 'varchar', length: 255, name: 'job_title', nullable: true })
  jobTitle!: string;

  @Column({ type: 'varchar', length: 255, name: 'employer', nullable: true })
  employer!: string;

  @Column({
    type: 'text',
    name: 'description',
    nullable: true,
  })
  description!: string;

  @Column({ type: 'varchar', length: 20, default: null, name: 'start_date' })
  startDate!: string;

  @Column({ type: 'varchar', length: 20, default: null, name: 'end_date' })
  endDate!: string;

  @ManyToOne(() => Profile, (profile) => profile.profilesIntership)
  @JoinColumn({ name: 'account_id', referencedColumnName: 'accountId' })
  profile!: Profile;
}

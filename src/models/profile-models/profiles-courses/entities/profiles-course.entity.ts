import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';

@Entity('profiles_courses')
export class ProfilesCourse {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'account_id', type: 'varchar', length: 50 })
  accountId!: string;

  @Column({ name: 'course_name', type: 'varchar', length: 255 })
  courseName!: string;

  @Column({ name: 'insitiution_name', type: 'varchar', length: 255 })
  insitiutionName!: string;

  @Column({ type: 'varchar', length: 20, default: null, name: 'start_date' })
  startDate!: string | null ;

  @Column({ type: 'varchar', length: 20, default: null, name: 'end_date' })
  endDate!: string | null;

  @ManyToOne(() => Profile, profile => profile.profilesCourse)
  @JoinColumn({ name: 'account_id', referencedColumnName: 'accountId' })
  profile!: Profile;
}

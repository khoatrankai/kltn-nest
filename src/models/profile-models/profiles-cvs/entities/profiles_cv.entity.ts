import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from '../../profiles/entities';

@Entity('profiles_cvs')
export class ProfilesCv {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: false, name: 'account_id' })
  accountId!: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'name',
    default: 'HBT CV',
  })
  name!: string;

  @Column({ type: 'varchar', length: 200, nullable: false, name: 'image' })
  image!: string;

  @Column({ type: 'int', nullable: false, default: 0, name: 'status' })
  status!: number;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'path' })
  path!: string;

  @Column({ type: 'int', default: 0, nullable: false, name: 'cv_index' })
  cvIndex!: number;

  @Column({ type: 'int', default: 0, nullable: false, name: 'template_id' })
  templateId!: string;

  @Column({ type: 'int', default: 0, nullable: false, name: 'device' })
  device!: number;

  @Column({ type: 'int', default: 0, nullable: false, name: 'is_new' })
  isNew!: number;

  @Column({ type: 'int', default: 0, nullable: false, name: 'is_public' })
  isPublic!: number;

  @Column({
    type: 'datetime',
    name: 'created_at',
    default: 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Column({
    type: 'datetime',
    name: 'updated_at',
    default: 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @ManyToOne(() => Profile, (profile) => profile.profilesCv)
  @JoinColumn({ name: 'account_id' })
  profile!: Profile;
}

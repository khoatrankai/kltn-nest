import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MoreCvExtraInformation } from '../../more-cv-extra-information/entities/more-cv-extra-information.entity';

@Entity({ name: 'cv_extra_information' })
export class CvExtraInformation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: '50',
    name: 'account_id',
    nullable: false,
  })
  accountId!: string;

  @Column({type: 'varchar', default: 'type1', name: 'type', nullable: true})
  type!:string;

  @Column({ type: 'int', default: 0, name: 'row' })
  row!: number;

  @Column({ type: 'int', default: 0, name: 'part' })
  part!: number;

  @Column({ type: 'int', default: 0, name: 'col' })
  col!: number;

  @Column({ type: 'int', default: 0, name: 'cv_index' })
  cvIndex!: number;

  @Column({type: 'int', default: 0, name: 'pad_index'})
  padIndex!: number;

  @OneToMany(() => MoreCvExtraInformation, moreCvExtraInformation => moreCvExtraInformation.cvExtraInformation)
  moreCvExtraInformation!: MoreCvExtraInformation[];
}

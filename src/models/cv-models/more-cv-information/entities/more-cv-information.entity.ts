import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CvInformation } from '../../cv-information/entities/cv-information.entity';

@Entity({ name: 'more_cv_information' })
export class MoreCvInformation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', name: 'cv_information_id', nullable: false })
  cvInformationId!: number;

  @Column({ type: 'varchar', length: 1000, nullable: true, name: 'content' })
  content!: string;

  @Column({type: 'int', default: 0, name: 'pad_index'})
  padIndex!: number;

  @ManyToOne(
    () => CvInformation,
    (cvInformation) => cvInformation.moreCvInformation,
  )
  @JoinColumn({ name: 'cv_information_id' })
  cvInformation!: CvInformation;
}

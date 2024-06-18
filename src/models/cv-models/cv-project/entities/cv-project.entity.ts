import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MoreCvProject } from '../../more-cv-project/entities/more-cv-project.entity';

@Entity({ name: 'cv_project' })
export class CvProject {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: false, name: 'account_id' })
  accountId!: string;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'type' })
  type!: string;

  @Column({ type: 'int', default: 0, name: 'row' })
  row!: number;

  @Column({ type: 'int', default: 0, name: 'part' })
  part!: number;

  @Column({ type: 'int', default: 0, name: 'col' })
  col!: number;

  @Column({ type: 'int', default: 0, name: 'cv_index' })
  cvIndex!: number;

  @Column({ type: 'int', default: 0, name: 'pad_index' })
  padIndex!: number;

  @OneToMany(() => MoreCvProject, (moreCvProject) => moreCvProject.cvProject)
  moreCvProject!: MoreCvProject[];
}

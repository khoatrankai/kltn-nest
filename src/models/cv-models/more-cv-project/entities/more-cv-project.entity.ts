import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CvProject } from "../../cv-project/entities/cv-project.entity";

@Entity({name: 'more_cv_project'})
export class MoreCvProject {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: 'cv_project_id', type: 'int', nullable: false})
    cvProjectId!: number;

    @Column({name: 'name', type: 'varchar', nullable: false, length: 1000})
    name!: string;

    @Column({name: 'time', type: 'varchar', nullable: false, length: 50})
    time!: string;

    @Column({name: 'link', type: 'varchar', nullable: false, length: 255})
    link!: string;

    @Column({name: 'participant', type: 'varchar', nullable: false, length: 50})
    participant!: string;

    @Column({name: 'position', type: 'varchar', nullable: false, length: 100})
    position!: string;

    @Column({name: 'functionality', type: 'varchar', nullable: false, length: 1000})
    functionality!: string;

    @Column({name: 'technology', type: 'varchar', nullable: false, length: 1000})
    technology!: string;

    @Column({name: 'index', type: 'int', nullable: false, default: 0})
    index!: number;

    @Column({name: 'pad_index', type: 'int', nullable: false, default: 0})
    padIndex!: number;

    @ManyToOne(() => CvProject, cvProject => cvProject.moreCvProject)
    @JoinColumn({name: 'cv_project_id'})
    cvProject!: MoreCvProject;
}

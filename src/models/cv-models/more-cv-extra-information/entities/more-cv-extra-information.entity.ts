import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CvExtraInformation } from "../../cv-extra-information/entities/cv-extra-information.entity";

@Entity({name: 'more_cv_extra_information'})
export class MoreCvExtraInformation {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: 'cv_extra_information_id', type: 'int', nullable: false})
    cvExtraInformationId!:number;

    @Column({name: 'position', type: 'varchar', nullable: false, length: 255})
    position!: string;

    @Column({name: 'time', type: 'varchar', nullable: false, length: 50})
    time!: string;

    @Column({name: 'company', type: 'varchar', nullable: false, length: 255})
    company!: string;

    @Column({name: 'description', type: 'varchar', nullable: false, length: 1000})
    description!: string;

    @Column({name: 'index', type: 'int', nullable: false, default: 0})
    index!: number;

    @Column({type: 'int', default: 0, name: 'pad_index'})
    padIndex!: number;

    @ManyToOne(() => CvExtraInformation, cvExtraInformation => cvExtraInformation.moreCvExtraInformation)
    @JoinColumn({name: 'cv_extra_information_id'})
    cvExtraInformation!: CvExtraInformation;
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MoreCvInformation } from "../../more-cv-information/entities/more-cv-information.entity";

@Entity('cv_information')
export class CvInformation {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 50, nullable: true, name: 'account_id'})
    accountId!: string;

    @Column({ type: 'varchar', length: 50, nullable: true, name: 'email'})
    email!: string;

    @Column({ type: 'varchar', length: 255, nullable: true, name: 'name'})
    name!: string;

    @Column({ type: 'varchar', length: 20, nullable: true, name: 'phone'})
    phone!: string;

    @Column({ type: 'varchar', length: 255, nullable: true, name: 'address'})
    address!: string;

    @Column({ type: 'varchar', length: 1000, nullable: true, name: 'intent'})
    intent!: string;

    @Column({ type: 'varchar', length: 50, nullable: true, name: 'type'})
    type!: string;

    @Column({ type: 'varchar', length: 255, nullable: true, name: 'avatar'})
    avatar!: string;

    @Column({ type: 'varchar', length: 255, nullable: true, name: 'link'})
    link!: string;

    @Column({type: 'int', default: 0, name: 'row'})
    row!: number;

    @Column({type: 'int', default: 0, name: 'part'})
    part!: number;

    @Column({type: 'int', default: 0, name: 'col'})
    col!: number;

    @Column({type: 'int', default: 0, name: 'cv_index'})
    cvIndex!: number;

    @Column({type: 'int', default: 0, name: 'pad_index'})
    padIndex!: number;

    @OneToMany(() => MoreCvInformation, moreCvInformation => moreCvInformation.cvInformation)
    moreCvInformation!: MoreCvInformation[];
}

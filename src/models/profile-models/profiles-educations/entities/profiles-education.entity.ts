import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "../../profiles/entities";
import { Transform } from "class-transformer";
import { AcademicType } from "src/models/academic_types/entities/academic_type.entity";

@Entity('profiles_educations')
export class ProfilesEducation {

    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id!: number;

    @Column({ type: 'varchar', length: 50, nullable: false, name: 'account_id' })
    accountId!: string;

    @Column({ type: 'varchar', length: 50, name: 'company_name' })
    companyName!: string;

    @Column({ type: 'varchar', length: 50, name: 'major' })
    major!: string;

    @Transform(({ value }) => +value ?? null)
    @Column({ type: 'varchar', length: 20, name: 'start_date' })
    startDate!: string; 

    @Transform(({ value }) => +value ?? null)
    @Column({ type: 'varchar', length: 20, name: 'end_date' }) 
    endDate!: string;

    @Column({ type: 'varchar', length: 50, name: 'extra_information' })
    extraInformation!: string;

    @Column({ type: 'tinyint', default: null, name: 'academic_type_id' })
    academicTypeId!: number;

    @Transform(({ value }) => new Date(value).getTime())
    @Column({ type: 'datetime', nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt!: Date;

    @Transform(({ value }) => new Date(value).getTime())
    @Column({ type: 'datetime', nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
    updatedAt!: Date;

    @ManyToOne(() => Profile, profile => profile.accountId)
    @JoinColumn({ name: 'account_id', referencedColumnName: 'accountId' })
    profile!: Profile;

    @ManyToOne(() => AcademicType, academicType => academicType.id)
    @JoinColumn({ name: 'academic_type_id' })
    academicType!: AcademicType;

}

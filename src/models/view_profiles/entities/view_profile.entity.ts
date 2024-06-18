import { Company } from "src/models/company-models/companies/entities/company.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'view_profiles'})
export class ViewProfile {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', nullable: false, name: 'recruit_id' , length: 50})
    recruitId!:string;

    @Column({ type: 'varchar', nullable: false, name: 'profile_id' , length: 50})
    profileId!:string;

    @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!:Date;

    @OneToOne(() => Company, company => company.accountId)
    @JoinColumn({ name: 'recruit_id', referencedColumnName: 'accountId'})
    company!: Company;
}

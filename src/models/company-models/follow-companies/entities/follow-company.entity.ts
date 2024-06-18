import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../../companies/entities/company.entity";

@Entity({
    name: 'follow_companies'
})
export class FollowCompany {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'int',
        name: 'company_id'
    })
    companyId!: number;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'account_id'
    })
    accountId!: string;

    @Column({
        type: 'timestamp',
        name: 'created_at'
    })
    createdAt!: Date;

    @Column({
        type: 'timestamp',
        name: 'updated_at'
    })
    updatedAt!: Date;

    @ManyToOne(() => Company, company => company.followCompanies)
    @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
    company!: Company;
}

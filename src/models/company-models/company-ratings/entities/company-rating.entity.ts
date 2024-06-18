import { User } from 'src/models/user-model/users/entities';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../../companies/entities/company.entity';

@Entity({ name: 'company_ratings' })
export class CompanyRating {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'account_id', type: 'varchar', nullable: false, length: 50 })
  accountId!: string;

  @Column({ name: 'company_id', type: 'int', nullable: false })
  companyId!: number;

  @Column({
    name: 'comment',
    type: 'varchar',
    nullable: true,
    length: 1000,
    default: '',
  })
  comment!: string;

  @Column({ name: 'star', type: 'varchar', nullable: false, length: 10 })
  star!: string;

  @Column({ name: 'status', type: 'int', nullable: false, default: 1 })
  status!: number;

  @Column({
    type: 'date',
    nullable: false,
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Column({
    type: 'date',
    nullable: false,
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.companyRatings)
  @JoinColumn({ name: 'account_id', referencedColumnName: 'id' })
  account!: User;

  @ManyToOne(() => Company, (company) => company.companyRatings)
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company!: Company;
}

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "../../profiles/entities";
import { Transform } from "class-transformer";

@Entity('profiles_experiences')
export class ProfilesExperiences {

    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id!: number;

    @Column({ type: 'varchar', length: 50, nullable: false, name: 'account_id' })
    accountId!: string;

    @Column({ type: 'varchar', length: 50, name: 'title'})
    title!: string;

    @Column({ type: 'varchar', length: 50, name: 'company_name' })
    companyName!: string;

    @Transform(({ value }) => +value ?? null)
    @Column({ type: 'varchar', length: 20, name: 'start_date' })
    startDate!: string;

    @Transform(({ value }) => +value ?? null)
    @Column({ type: 'varchar', length: 20, name: 'end_date' })
    endDate!: string;

    @Column({ type: 'varchar', length: 50, name: 'extra_information' })
    extraInformation!: string;

    @Transform(({ value }) => new Date(value).getTime())
    @Column({ type: 'datetime', nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt!: Date;

    @Transform(({ value }) => new Date(value).getTime())
    @Column({ type: 'datetime', nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
    updatedAt!: Date;

    @ManyToOne(() => Profile, profile => profile.accountId)
    @JoinColumn({ name: 'account_id', referencedColumnName: 'accountId' })
    profile!: Profile;

}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('company_sizes')
export class CompanySize {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name!: string;

    @Column({ type: 'varchar', length: 255, nullable: false, name: 'name_en' })
    nameEn!: string;

    @Column({ type: 'varchar', length: 255, nullable: false, name: 'name_ko' })
    nameKo!: string;

    @Column({ type: 'tinyint', nullable: false, default: 1 })
    status!: number;

    @Column({
        type: 'datetime',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createdAt!: Date;

    @Column({
        type: 'datetime',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt!: Date;
}

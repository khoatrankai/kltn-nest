import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('profiles_categories')
export class ProfilesCategory {

    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id!: number;

    @Column({ type: 'varchar', length: 50, nullable: false, name: 'account_id' })
    accountId!: string;

    @Column({ type: 'int', nullable: false, name: 'category_id' })
    categoryId!: number;

}

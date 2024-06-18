import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";

@Entity('suggest_search')
export class SuggestSearch {
    
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'varchar', length: 255, name: 'keyword' })
    keyword!: string;


    @Column({ type: 'tinyint', nullable: false, default: 1 })
    status!: number;

    @Column({ type: 'int', nullable: false, default: 0})
    order!: number;

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

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_point_histories')
export class UserPointHistory {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        name: 'user_id',
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    userId!: string;

    @Column({
        name: 'order_id',
        type: 'varchar',
        nullable: false,
    })
    orderId!: string;

    @Column({
        name: 'amount',
        type: 'int',
        nullable: false,
    })
    amount!: number;

    @Column({
        name: 'description',
        type: 'varchar',
        length: 1000,
        nullable: false,
    })
    description!: string;

    @Column({
        name: 'status',
        type: 'int',
        nullable: false,
        default: 1,
    })
    status!: number;

    @Column({
        name: 'created_at',
        type: 'datetime',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt!: Date;
}

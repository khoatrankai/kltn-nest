import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "block_reasons"
})
export class BlockReason {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        name: "reason",
        type: "varchar",
        length: 255
    })
    reason!: string;

    @Column({
        name: "status",
        type: "tinyint",
        default: 1
    })
    status!:number;

    @Column({
        name: "created_at",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt!: Date;

    @Column({
        name: "updated_at",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    updatedAt!: Date;
}

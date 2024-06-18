import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('hot_topics')
export class HotTopic {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id!: number;

    // '1: Remotely_job, 2: Constraint by parent_category, 3: Constraint by chilfren category',
    @Column({ type: 'tinyint', name: 'type' })
    type!: number;

    @Column({ type: 'int', name: 'detail_id' })
    detailId!: number;

    @Column({ type: 'varchar', length: 255, name: 'title' })
    title!: string;

    @Column({ type: 'varchar', length: 255, name: 'image' })
    image!: string;

    @Column({ type: 'tinyint', name: 'theme_id' })
    themeId!: number;

    @Column({ type: 'tinyint', name: 'order', select: false })
    order!: number;

    @Column({ type: 'tinyint', name: 'status', select: false })
    status!: number;

    @Column({ type: 'datetime', name: 'created_at', select: false })
    createdAt!: Date;


}
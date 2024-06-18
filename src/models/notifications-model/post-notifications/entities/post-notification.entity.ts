import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('post_notification')
export class PostNotification {
    
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ name: 'account_id', type: 'varchar', length: 50 })
    accountId!: string;

    @Column({ name: 'post_id', type: 'int' })
    postId!: number;

    @Column({ name: 'is_read', type: 'tinyint', default: 0 })
    isRead!: number;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;
}

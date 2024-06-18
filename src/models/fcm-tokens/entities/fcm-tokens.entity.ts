import { User } from "src/models/user-model/users/entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('fcm_tokens')
export class FcmTokensEntity {
    @PrimaryColumn({ name: 'token', type: 'varchar', length: 255 })
    token!: string;

    @Column({ name: 'account_id', type: 'varchar', length: 50 })
    accountId!: string;

    // @Column({ name: 'device_id', type: 'varchar', length: 255 })
    // deviceId!: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'account_id', referencedColumnName: 'id' })
    user!: User;
}
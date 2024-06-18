import { User } from "src/models/user-model/users/entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('mail_logs')
export class MailLogger {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'datetime', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    date!: Date;

    @Column({ type: 'varchar', length: 50, nullable: false, name: 'account_id' })
    accountId!: string;

    @Column({ type: 'varchar', length: 255, nullable: false, name: 'recipient' })
    recipient!: string;

    @Column({ type: 'varchar', length: 255, nullable: false, name: 'subject' })
    subject!: string;

    @Column({ type: 'varchar', length: 255, nullable: false, name: 'template' })
    template!: string;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'account_id' })
    user!: User;  

}

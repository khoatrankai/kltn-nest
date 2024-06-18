import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('type_notification_platform')
export class TypeNotificationPlatform {

    @PrimaryColumn({type: 'varchar', length: 50, name: 'account_id', nullable: false})
    accountId!: string;

    @Column({type: 'tinyint', default: 0, nullable: false})
    type!:number

    @Column({type: 'tinyint', default: 0, name: 'email_status', nullable: false})
    emailStatus!:number 

    @Column({type: 'tinyint', default: 0, name: 'push_status', nullable: false})
    pushStatus!:number
}

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ServiceRecruitment } from "../../service-recruitment/entities/service-recruitment.entity";
import { User } from "src/models/user-model/users/entities";

@Entity({
    name: 'service_history'
})
export class ServiceHistory {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        name: 'service_recruitment_id',
        type: 'int',
        nullable: false
    })
    serviceRecruitmentId!: number;

    @Column({
        name: 'account_id',
        type: 'varchar',
        nullable: false,
        length: '50'
    })
    accountId!: string;

    @Column({
        name: 'service_name',
        type: 'varchar',
        nullable: false,
        length: '255'
    })
    serviceName!: string;

    @Column({
        name: 'service_description',
        type: 'varchar',
        nullable: false,
        length: '1000'
    })
    serviceDescription!: string;

    @Column({
        name: 'service_price',
        type: 'int',
        nullable: false,
    })
    servicePrice!: number;


    @Column({
        name: 'service_type',
        type: 'varchar',
        nullable: false
    })
    serviceType!: string;

    @Column({
        name: 'service_expiration',
        type: 'int',
        nullable: false
    })
    serviceExpiration!: number;

    @Column({
        name: 'status',
        type: 'int',
        nullable: false
    })
    status!:number;


    @Column({
        name: 'created_at',
        type: 'timestamp',
        nullable: false
    })
    createdAt!: Date;


    @Column({
        name: 'updated_at',
        type: 'timestamp',
        nullable: false
    })
    updatedAt!: Date;

    @ManyToOne(() => ServiceRecruitment, serviceRecruitment => serviceRecruitment.serviceHistories)
    @JoinColumn({
        name: 'service_recruitment_id',
        referencedColumnName: 'id'
    })
    serviceRecruitment!: ServiceRecruitment;

    @ManyToOne(() => User, user => user.serviceHistories)
    @JoinColumn({
        name: 'account_id',
        referencedColumnName: 'id'
    })
    account!: User;
}

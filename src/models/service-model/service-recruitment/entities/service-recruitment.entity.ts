import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ServiceRecruitmentImage } from "../../service-recruitment-images/entities/service-recruitment-image.entity";
import { ServiceHistory } from "../../service-history/entities/service-history.entity";

@Entity({ name: 'service_recruitment' })
export class ServiceRecruitment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        name: 'name'
    })
    name!: string;

    @Column({
        type: 'varchar',
        length: 1000,
        nullable: false,
        name: 'description'
    })
    description!: string;

    @Column({
        type: 'int',
        nullable: false,
        name: 'price',
        default: 0
    })
    price!: number;

    @Column({
        type: 'int',
        nullable: false,
        name: 'discount',
        default: 0
    })
    discount!: number;

    @Column({
        type: 'int',
        nullable: false,
        name: 'expiration',
        default: 0
    })
    expiration!: number;


    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        name: 'icon',
        default: ''
    })
    icon!: string;


    @Column({
        type: 'int',
        nullable: false,
        name: 'status',
        default: 0
    })
    status!: number;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        name: 'type',
        default: ''
    })
    type!: string;

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

    @OneToMany(() => ServiceRecruitmentImage, serviceRecruitmentImages => serviceRecruitmentImages.serviceRecruitment)
    serviceRecruitmentImages!: ServiceRecruitmentImage[];

    @OneToMany(() => ServiceHistory, serviceHistories => serviceHistories.serviceRecruitment)
    serviceHistories!: ServiceHistory[];
    
}

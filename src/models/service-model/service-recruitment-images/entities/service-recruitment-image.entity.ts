import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ServiceRecruitment } from "../../service-recruitment/entities/service-recruitment.entity";

@Entity({ name: 'service_recruitment_images' })
export class ServiceRecruitmentImage {

    @PrimaryGeneratedColumn()
    id!: number;


    @Column({
        type: 'int',
        nullable: false,
        name: 'service_recruitment_id'
    })
    serviceRecruitmentId!: number;


    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        name: 'image'
    })
    image!: string;

    @Column({
        type: 'int',
        nullable: false,
        name: 'status',
        default: 1
    })
    status!: number;

    @Column({
        type: 'int',
        nullable: false,
        name: 'created_at'
    })
    createdAt!: number;

    @Column({
        type: 'int',
        nullable: false,
        name: 'updated_at'
    })
    updatedAt!: number;

    @ManyToOne(() => ServiceRecruitment, serviceRecruitment => serviceRecruitment.serviceRecruitmentImages)
    @JoinColumn({ name: 'service_recruitment_id' })
    serviceRecruitment!: ServiceRecruitment;
}

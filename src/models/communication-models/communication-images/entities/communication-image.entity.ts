import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Communication } from "../../communications/entities/communication.entity";

@Entity('communication_images')
export class CommunicationImage {
    
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'int', nullable: false, name: 'communication_id' })
    communicationId!: number;

    @Column({ type: 'varchar', length: 255, nullable: false, name: 'image' })
    image!: string;

    @Column({ type: 'tinyint', nullable: false, name: 'status', default: 1 })
    status!: number;

    @Column({ type: 'date', nullable: false, name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ type: 'date', nullable: false, name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    @ManyToOne(() => Communication, communication => communication.communicationImages)
    @JoinColumn({name: 'communication_id'})
    communication!: Communication
}

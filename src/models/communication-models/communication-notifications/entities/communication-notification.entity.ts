import { Type } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('communication_notifications')
export class CommunicationNotification {

    @PrimaryGeneratedColumn('increment') // type: bigint
    @Type(() => Number)
    id!: number;
    
    @Column({ type: "int", name: "communication_id", nullable: false })
    @Type(() => Number)
    communicationId!: number;

    @Column({ type: "int", name: "comment_id", nullable: false })
    @Type(() => Number)
    commentId!: number;

    @Column({ type: "tinyint", name: "status", default: 0, nullable: false })
    @Type(() => Number)
    status!: number;

    @Column({ type: "datetime", name: "created_at", default: () => "CURRENT_TIMESTAMP" })
    @Type(() => Date)
    createdAt!: Date;

    @Column({ type: "datetime", name: "updated_at", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    @Type(() => Date)
    updatedAt!: Date;

}

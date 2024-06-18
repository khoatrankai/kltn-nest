import { ParentCategory } from "src/models/categories/parents/entities/parent.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Communication } from "../../communications/entities/communication.entity";

@Entity('communication_categories')
export class CommunicationCategory {

    @PrimaryColumn({ type: 'int', nullable: false, name: 'communication_id' })
    communicationId!: number;

    @PrimaryColumn({ type: 'int', nullable: false, name: 'category_id' })
    categoryId!: number;

    @ManyToOne(() => ParentCategory, parentCategory => parentCategory.id)
    @JoinColumn({ name: 'category_id' })
    parentCategory!: ParentCategory;

    @ManyToOne(() => Communication, communication => communication.communicationCategories)
    @JoinColumn({ name: 'communication_id' })
    communication!: Communication
}
// import { ParentCategory } from "src/models/categories/parents/entities/parent.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cv_template')
export class CvTemplate {
    
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'varchar', length: 255, nullable: false, name: 'name' })
    name!: string;

    @Column({ type: 'varchar', length: 255, nullable: false, name: 'image' })
    image!: string;

    @Column({ type: 'tinyint', nullable: false, default: 1, name: 'status' })
    status!: number;

    @Column({ type: 'int', nullable: false, name: 'parent_category_id' })
    parentCategoryId!: number;

    @Column({ type: 'timestamp', nullable: false, name: 'created_at' })
    createdAt!: Date;

    // @ManyToOne(() => ParentCategory, (parentCategory) => parentCategory.id)
    // parentCategory!: ParentCategory;

}

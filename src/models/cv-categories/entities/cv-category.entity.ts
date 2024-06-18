import { ParentCategory } from "src/models/categories/parents/entities/parent.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "cv_categories",
})
export class CvCategory {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "tinyint",
        nullable: false,
        name: "cv_index"
    })
    cvIndex!: number;

    @Column({
        type: "varchar",
        length: 255,
        nullable: false,
        name: "account_id"
    })
    accountId!: string;

    @Column({
        type: "tinyint",
        nullable: false,
        name: "parent_category_id"
    })
    parentCategoryId!: number;

    @Column({
        type: "varchar",
        nullable: false,
        name: "ward_id"
    })
    wardId!: string;

    @Column({
        type: "tinyint",
        nullable: false,
        name: "percent"
    })
    percent!: number;

    @ManyToOne(() => ParentCategory, parentCategory => parentCategory.cvCategories)
    @JoinColumn({ name: 'parent_category_id' })
    parentCategory: ParentCategory | undefined;
}

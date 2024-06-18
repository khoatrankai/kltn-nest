import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ChildCategory } from "../../children/entities/child.entity";
import { CvCategory } from "src/models/cv-categories/entities/cv-category.entity";

@Entity('parent_categories')
export class ParentCategory {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 50 })
    name!: string;

    @Column({ type: 'varchar', length: 255, name: 'name_en' })
    nameEn!: string;

    @Column({ type: 'varchar', length: 255, name: 'name_kor' })
    nameKor!: string;

    @Column({ type: 'varchar', length: 255, name: 'image' })
    image!: string;

    @Column({ type: 'varchar', length: 255, name: 'default_post_image' })
    defaultPostImage!: string;

    @Column({ type: 'tinyint', name: 'status' })
    status!: number;

    @OneToMany(() => ChildCategory, childCategory => childCategory.parentCategory)
    childCategories: ChildCategory[] | undefined;

    @OneToMany(() => CvCategory, cvCategory => cvCategory.parentCategory)
    cvCategories: CvCategory[] | undefined;
}

import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ParentCategory } from "../../parents/entities/parent.entity";
import { Post } from "src/models/post-models/posts/entities";

@Entity('child_categories')
export class ChildCategory {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 50 })
    name!: string;

    @Column({ type: 'varchar', length: 255, name: 'name_en' })
    nameEn!: string;

    @Column({ type: 'varchar', length: 255, name: 'name_kor' })
    nameKor!: string;

    @Column({ type: 'tinyint', name: 'status' })
    status!: number;

    @Column({ type: 'int', name: 'parent_category_id' })
    parentCategoryId!: number;

    @ManyToOne(() => ParentCategory, parentCategory => parentCategory.childCategories)
    @JoinColumn({ name: 'parent_category_id' })
    parentCategory!: ParentCategory;

    // @ManyToMany(() => PostCategories, postCategories => postCategories.childCategory)
    // postCategories: PostCategories[] | undefined;

    @ManyToMany(() => Post, post => post.id)
    @JoinTable({
        name: 'posts_categories',
        joinColumn: {
            name: 'category_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'post_id',
            referencedColumnName: 'id'
        }
    })
    posts: Post[] | undefined;

    
}

// import { ChildCategory } from "src/models/categories/children/entities/child.entity";
import { Post } from "src/models/post-models/posts/entities";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('posts_categories')
export class PostCategories {
    @PrimaryColumn('int', { name: 'post_id' })
    postId!: number;

    @PrimaryColumn('int', { name: 'category_id' })
    categoryId!: number;

    @ManyToOne(() => Post, post => post.id)
    @JoinColumn({ name: 'post_id' })
    post: Post | undefined;


    // childCategory: ChildCategory[] | undefined;
}
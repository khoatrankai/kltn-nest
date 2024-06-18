import { Post } from "src/models/post-models/posts/entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "cvs_posts",
})
export class CvsPost {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        name: "account_id",
        type: 'varchar',
        length: 50
    })
    accountId!: string;

    @Column({
        name: "cv_index",
        type: 'int'
    })
    cvIndex!: number;

    @Column({
        name: "post_id",
        type: 'int'
    })
    postId!: number;

    @Column({
        name: "type",
        type: 'int'
    })
    type!: number;

    @ManyToOne(() => CvsPost, cvsPost => cvsPost.id)
    @JoinColumn({ name: 'post_id' })
    post!: Post;
}

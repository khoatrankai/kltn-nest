import { Post } from "src/models/post-models/posts/entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('post_images')
export class PostImages {

    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'int', name: 'post_id' })
    postId!: number;

    @Column({ type: 'varchar', length: 200, name: 'image' })
    image!: string;

    @Column({ type: 'tinyint', name: 'type', default: 0 })
    type!: number;

    @Column({ type: 'tinyint', name: 'status' })
    status!: number;

    @ManyToOne(() => Post, post => post.postImages)
    @JoinColumn({ name: 'post_id' })
    post: Post | undefined;
}

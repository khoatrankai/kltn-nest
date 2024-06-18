import { Post } from "src/models/post-models/posts/entities";
import { User } from "src/models/user-model/users/entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('bookmarks')
export class Bookmark {
    
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'varchar', length: 50, name: 'account_id' })
    accountId!: string;

    @Column({ type: 'int', name: 'post_id' })
    postId!: number;

    @Column({ type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'account_id' })
    user: User | undefined;

    @ManyToOne(() => Post, post => post.id)
    @JoinColumn({ name: 'post_id' })
    post: Post | undefined;

}

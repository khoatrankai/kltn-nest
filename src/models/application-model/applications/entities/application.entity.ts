// import { Post } from 'src/models/post-models/posts/entities';
import { Post } from 'src/models/post-models/posts/entities';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    //   JoinColumn,
    //   ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('applications')
export class Application {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'varchar', length: 50, name: 'account_id' })
    accountId!: string;

    @Column({ type: 'int', name: 'post_id' })
    postId!: number;

    @Column({ type: 'tinyint', default: 0, name: 'status' })
    status!: number;

    @Column({ type: 'tinyint', default: '0', name: 'liked' })
    liked!: string;

    @Column({ type: 'varchar', length: 50, name: 'name'})
    name!: string;

    @Column({ type: 'varchar', length: 20, name: 'birthday'})
    birthday!: string;

    @Column({ type: 'varchar', length: 20, name: 'address'})
    address!: string;

    @Column({ type: 'tinyint', default: 0, name: 'gender'})
    gender!: number;

    @Column({ type: 'varchar', length: 2000, name: 'phone'})
    introduction!: string;

    @Column({ type: 'varchar', length: 15, name: 'phone'})
    phone!: string;

    @Column({ type: 'varchar', length: 50, name: 'email'})
    email!: string;

    @Column({ type: 'varchar', length: 50, name: 'facebook'})
    facebook!: string;

    @Column({ type: 'varchar', length: 50, name: 'linkedin'})
    linkedin!: string;

    @Column({ type: 'varchar', length: 50, name: 'avatar'})
    avatar!: string;

    @Column({ type: 'varchar', length: 100, name: 'cv_url'})
    cvUrl!: string;

    @Column({ type: 'varchar', length: 5000, name: 'description'})
    description!: string;

    @Column({ type: 'datetime', name: 'created_at' })
    createdAt!: Date;

    @Column({ type: 'datetime', name: 'updated_at' })
    updatedAt!: Date;

    @ManyToOne(() => Post, post => post.applications)
    @JoinColumn({ name: 'post_id' })
    post!: Post;
}


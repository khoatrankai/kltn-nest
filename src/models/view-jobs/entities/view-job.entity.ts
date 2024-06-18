import { Post } from "src/models/post-models/posts/entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'view_jobs'
})
export class ViewJob {

    @PrimaryGeneratedColumn()
    id!:number;

    @Column({
        name: 'post_id',
        type: 'int',
        nullable: false
    })
    postId!:number;

    @Column({
        name: 'account_id',
        type: 'varchar',
        length: 50,
        nullable: false
    })
    accountId!:string;


    @Column({
        name: 'created_at',
        type: 'timestamp',
        nullable: false
    })
    createdAt!:Date;

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        nullable: false
    })
    updatedAt!:Date;

    @ManyToOne(() => Post, post => post.viewJobs)
    @JoinColumn({name: 'post_id'})
    post!:Post;

}

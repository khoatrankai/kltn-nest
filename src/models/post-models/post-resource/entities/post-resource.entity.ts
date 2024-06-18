import { CompanyResource } from 'src/models/company-resources/entities/company-resources.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { Post } from "../../posts/entities";

@Entity('post_resource')
export class PostResource {
    @PrimaryColumn('int', { name: 'post_id' })
    postId!: number;

    @Column({ type: 'varchar', length: 255, name: 'url', default: 'https://neoworks.vn' })
    url!: string;

    @Column({ type: 'tinyint', name: 'company' })
    company!: number;

    @ManyToOne(() => CompanyResource, companyResource => companyResource.id)
    @JoinColumn({ name: 'company' })
    companyResource!: CompanyResource;

    @OneToOne(() => Post, post => post.id)
    @JoinColumn({ name: 'post_id' })
    post: Post | undefined;
}
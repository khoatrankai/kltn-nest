import { PostResource } from "src/models/post-models/post-resource/entities/post-resource.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('company_resource')
export class CompanyResource {
    
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'varchar', length: 50, name: 'name' })
    name!: string;

    @Column({ type: 'varchar', length: 255, name: 'icon' })
    logo!: string | null;

    @OneToMany(() => PostResource, postResource => postResource.companyResource)
    @JoinColumn({ name: 'id' })
    postResource!: PostResource[];

}
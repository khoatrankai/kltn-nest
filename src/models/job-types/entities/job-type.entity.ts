import { Post } from "src/models/post-models/posts/entities";
import { Profile } from "src/models/profile-models/profiles/entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('job_types')
export class JobType {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'varchar', length: 50 })
    name!: string;

    @Column({ type: 'varchar', length: 50, name: 'name_en' })
    nameEn!: string;

    @Column({ type: 'varchar', length: 50, name: 'name_ko' })
    nameKo!: string;

    @OneToMany(() => Post, post => post.jobType)
    posts: Post[] | undefined;

    @OneToMany(() => Profile, profilesJob => profilesJob.jobType)
    profilesJob: Profile[] | undefined;
}

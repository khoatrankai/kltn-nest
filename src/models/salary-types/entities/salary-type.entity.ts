import { Post } from "src/models/post-models/posts/entities";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('salary_types')
export class SalaryType {
    
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'varchar', length: 50, name: 'value' })
    value!: string;

    @Column({ type: 'varchar', length: 50, name: 'value_en' })
    valueEn!: string;

    @Column({ type: 'varchar', length: 50, name: 'value_ko' })
    valueKo!: string;

    @OneToMany(() => Post, post => post.salaryType)
    @JoinColumn({ name: 'salary_type' })
    posts: Post[] | undefined;
}

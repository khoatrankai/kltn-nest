import { District } from './../../districts/entities/district.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Location } from '../../location.class';
import { Post } from 'src/models/post-models/posts/entities';


@Entity('wards')
export class Ward extends Location {

    @Column({ type: 'varchar', name: 'district_id' })
    districtId!: string;

    @ManyToOne(() => District, distrcit => distrcit.id)
    @JoinColumn({ name: 'district_id' })
    district!: District;

    @OneToMany(() => Post, post => post.ward)
    posts: Post[] | undefined;
    
    // @Column({ type: 'int', name: 'administrative_unit_id' })
    // administrativeUnitId!: number;

    // @Column({ type: 'int', name: 'administrative_unit_parent_id' }) 
}

import { Entity, OneToMany } from "typeorm";
import { District } from "../../districts/entities";
import { Location } from "../../location.class";


@Entity('provinces')
export class Province extends Location {
    @OneToMany(() => District, district => district.province)
    districts!: District[];

    // @Column({ type: 'int', name: 'administrative_unit_id' })
    // administrativeUnitId!: number;

    // @Column({ type: 'int', name: 'administrative_unit_parent_id' }) 
}

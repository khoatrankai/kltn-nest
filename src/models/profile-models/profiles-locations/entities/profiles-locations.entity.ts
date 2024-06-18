import { District } from "src/models/locations/districts/entities";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('profiles_locations')
export class ProfilesLocation{

    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id!: number;

    @Column({ type: 'varchar', length: 20, nullable: false, name: 'location_id' })
    locationId!: string;

    @Column({ type: 'varchar', length: 50, nullable: false, name: 'account_id' })
    accountId!: string;

    @OneToOne(() => District, district => district.id)
    @JoinColumn({ name: 'location_id' })
    district!: District;

}

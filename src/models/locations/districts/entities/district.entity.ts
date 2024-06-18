import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Province } from "../../provinces/entities";
import { Location } from "../../location.class";
import { ProfilesLocation } from "src/models/profile-models/profiles-locations/entities/profiles-locations.entity";


@Entity('districts')
export class District extends Location {

    @Column({ type: 'varchar', name: 'province_id' })
    provinceId!: string;

    @ManyToOne(() => Province, province => province.id)
    @JoinColumn({ name: 'province_id' })
    province!: Province;

    @OneToOne(() => ProfilesLocation, profilesLocation => profilesLocation.district)
    profilesLocation!: ProfilesLocation;

}
    
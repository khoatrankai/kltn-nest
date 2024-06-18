import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "../../profiles/entities";

@Entity('profiles_hobbies')
export class ProfilesHobby {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', length: 50, name: 'account_id'})
    accountId!: string;

    @Column({type: 'varchar', length: 1000, name: 'description'})
    description!: string;

    @OneToOne(() => Profile, profile => profile.profilesHobby)
    @JoinColumn({name: 'account_id', referencedColumnName: 'accountId'})
    profile!: Profile;
}

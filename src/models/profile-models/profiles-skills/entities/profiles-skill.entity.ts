import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LevelType } from "../../types/level-type/entities/level-types.entity";
import { Profile } from "../../profiles/entities";

@Entity('profiles_skills')
export class ProfilesSkill {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 50, nullable: false, name: 'account_id' })
    accountId!: string;

    @Column({ type: 'varchar', length: 255, nullable: false, name: 'skill_name' })
    skillName!: string;

    @Column({type: 'int', name: 'skill_level_id'})
    skillLevelId!:number;

    @ManyToOne(() => LevelType, levelType => levelType.profileSkill)
    @JoinColumn({name: 'skill_level_id'})
    levelType!:LevelType;

    @ManyToOne(() => Profile, profile => profile.profilesSkill)
    @JoinColumn({name: 'account_id'})
    profile!: Profile;
}

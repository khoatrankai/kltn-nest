import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { ProfilesSkill } from "../../../profiles-skills/entities/profiles-skill.entity";

@Entity('skill_level_types')
export class LevelType {
    
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'varchar', length: 50, name: 'value' })
    value!: string;

    @Column({ type: 'varchar', length: 50, name: 'value_en' })
    valueEn!: string;

    @Column({ type: 'varchar', length: 50, name: 'value_ko' })
    valueKo!: string;

    @OneToMany(() => ProfilesSkill, profileSkill => profileSkill.levelType)
    profileSkill!: ProfilesSkill[] | undefined

}

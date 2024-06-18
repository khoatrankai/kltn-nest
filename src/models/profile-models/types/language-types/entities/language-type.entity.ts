import { ProfileLanguage } from "src/models/profile-models/profile-languages/entities/profile-language.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'language_level_types' })
export class LanguageType {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255, nullable: false, name:'value'})
    value!: string;

    @Column({ type: 'varchar', length: 255, nullable: false, name:'value_en'})
    valueEn!: string;

    @Column({ type: 'varchar', length: 255, nullable: false, name:'value_ko'})
    valueKo!: string;

    @OneToMany(() => ProfileLanguage, profileLanguage => profileLanguage.levelTypeLanguage)
    profileLanguages!: ProfileLanguage[] | undefined
}

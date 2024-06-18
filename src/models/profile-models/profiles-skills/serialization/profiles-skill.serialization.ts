import { Exclude, Expose } from "class-transformer";
import { ProfilesSkill } from "../entities/profiles-skill.entity";
import { Language } from "src/common/enum";
import { LevelType } from "../../types/level-type/entities/level-types.entity";
import { LevelTypeSerialization } from "../../types/level-type/serialization/level-types.seriazalion";

export class ProfileSkillSerialization extends ProfilesSkill {

    @Exclude({ toPlainOnly: true })
    lang!: Language;
    
    constructor(profileSkill: ProfilesSkill, lang: Language) {
      super();
      this.lang = lang;
      Object.assign(this, profileSkill);
    }

    @Exclude({ toPlainOnly: true })
    override accountId!: string;

    @Exclude({ toPlainOnly: true })
    override levelType!: LevelType;

    @Exclude({ toPlainOnly: true })
    override skillLevelId!: number;

    @Expose() 
    get dataLevel(){
        return new LevelTypeSerialization(this.levelType, this.lang)
    }

}
  
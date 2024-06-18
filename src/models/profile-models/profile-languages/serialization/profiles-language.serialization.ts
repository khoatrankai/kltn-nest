import { Exclude, Expose } from "class-transformer";
import { ProfileLanguage } from "../entities/profile-language.entity";
import { Language } from "src/common/enum";
import { LanguageTypeSerialization } from "../../types/language-types/serialization/language-types.serializaion";
import { LanguageType } from "../../types/language-types/entities/language-type.entity";

export class ProfileLanguageSerialization extends ProfileLanguage {

    @Exclude({ toPlainOnly: true })
    lang!: Language;
    
    constructor(profileLanguage: ProfileLanguage, lang: Language) {
      super();
      this.lang = lang;
      Object.assign(this, profileLanguage);
    }

    @Exclude({ toPlainOnly: true })
    override accountId!: string;

    @Exclude({ toPlainOnly: true })
    override levelTypeLanguage!: LanguageType;

    @Exclude({ toPlainOnly: true })
    override languageLevelId!: number;

    @Expose() 
    get dataLevel(){
        return new LanguageTypeSerialization(this.levelTypeLanguage, this.lang)
    }

}
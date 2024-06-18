import { Language } from "src/common/enum";
import { LanguageType } from "../entities/language-type.entity";
import { Exclude, Expose } from "class-transformer";

export class LanguageTypeSerialization extends LanguageType {

    @Exclude({ toPlainOnly: true })
    lang!: Language;
    
    constructor(languageType: LanguageType, lang : Language) {
      super();
      this.lang = lang;
      Object.assign(this, languageType);
    }

    @Exclude({ toPlainOnly: true })
    override value!: string ;

    @Exclude({ toPlainOnly: true })
    override valueEn!: string;

    @Exclude({ toPlainOnly: true })
    override valueKo!: string;

    @Expose()
    get data() {
        switch(this.lang) {
            case Language.EN:
                return this.valueEn;
            case Language.KO:
                return this.valueKo;
            default:
                return this.value;
        }
    }

}
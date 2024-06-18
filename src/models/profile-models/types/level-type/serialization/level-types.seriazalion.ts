import { Exclude, Expose } from "class-transformer";
import { LevelType } from "../entities/level-types.entity";
import { Language } from "src/common/enum";

export class LevelTypeSerialization extends LevelType {

    @Exclude({ toPlainOnly: true })
    lang!: Language;
    
    constructor(levelType: LevelType, lang : Language) {
      super();
      this.lang = lang;
      Object.assign(this, levelType);
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
import { Language } from "src/common/enum";
import { AcademicType } from "../entities/academic_type.entity";
import { Exclude, Expose } from "class-transformer";


export class AcedemicTypesSerialization extends AcademicType {

    @Exclude({ toPlainOnly: true })
    lang: Language;

    constructor(academicType: AcademicType, lang: Language) {
        super();
        Object.assign(this, academicType);
        this.lang = lang;
    }

    @Exclude({ toPlainOnly: true })
    override value!: string;

    @Exclude({ toPlainOnly: true })
    override valueEn!: string;

    @Exclude({ toPlainOnly: true })
    override valueKo!: string;

    @Expose()
    get data() {
        switch (this.lang) {
            case Language.EN:
                return this.valueEn;
            case Language.KO:
                return this.valueKo;
            default:
                return this.value;
        }
    }
}
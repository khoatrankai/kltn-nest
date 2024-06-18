import { Exclude, Expose } from "class-transformer";
import { CompanySize } from "../entities/company-size.entity";
import { Language } from "src/common/enum";

export class CompanySizeSerialization extends CompanySize {

    @Exclude({ toPlainOnly: true })
    lang: Language;

    constructor(companySize: CompanySize, lang: Language) {
        super();
        this.lang = lang;
        Object.assign(this, companySize);
    }

    @Exclude({ toPlainOnly: true })
    override createdAt!: Date;

    @Exclude({ toPlainOnly: true })
    override updatedAt!: Date;

    @Exclude({ toPlainOnly: true })
    override status!: number;

    @Exclude({ toPlainOnly: true })
    override nameEn!: string;

    @Exclude({ toPlainOnly: true })
    override nameKo!: string;

    @Exclude({ toPlainOnly: true })
    override name!: string;

    @Expose()
    get nameText() {
        if (!this.name) return null;
        if (this.lang === Language.EN) return this.nameEn;
        if (this.lang === Language.KO) return this.nameKo;
        return this.name;
    }
}
import { Language } from "src/common/enum";
import { JobType } from "../entities/job-type.entity";
import { Exclude, Expose } from "class-transformer";


export class JobTypesSerialization extends JobType {

    @Exclude({ toPlainOnly: true })
    lang: Language;

    constructor(jobType: JobType, lang: Language) {
        super();
        this.lang = lang;
        Object.assign(this, jobType);
    }

    @Exclude({ toPlainOnly: true })
    override name!: string

    @Exclude({ toPlainOnly: true })
    override nameEn!: string

    @Exclude({ toPlainOnly: true })
    override nameKo!: string

    @Expose()
    get data() {
        switch (this.lang) {
            case Language.EN:
                return this.nameEn;
            case Language.KO:
                return this.nameKo;
            default:
                return this.name;
        }
    }
} 
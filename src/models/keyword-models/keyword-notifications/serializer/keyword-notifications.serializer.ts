import { Exclude, Expose, Transform } from "class-transformer";
import { KeywordNotification } from "../entities/keyword-notification.entity";
import { categoryTranslator, locationTranslator } from "src/common/helper/translators";
import { Language } from "src/common/enum";
import { District } from "src/models/locations/districts/entities";

export class KeywordNotificationsSerializer extends KeywordNotification {
    lang: Language;

    constructor(keywordNotification: KeywordNotification, lang: Language) {
        super();
        Object.assign(this, keywordNotification);
        this.lang = lang;
    }

    @Exclude()
    override accoundId!: string; 

    @Exclude()
    override districtId!: string;

    @Exclude()
    override categoryId!: number;

    @Transform(({ value }) => new Date(value).getTime())
    @Expose()
    override createdAt!: Date;

    @Exclude({ toPlainOnly: true })
    override categories: any[] | undefined;

    @Exclude({ toPlainOnly: true })
    override districts: District[] | undefined;

    @Expose()
    get keywordCategories() {
        return this.categories?.map(category => categoryTranslator(category, this.lang))
    }

    @Expose()
    get keywordDistricts() {
        return this.districts?.map(district => locationTranslator(district, this.lang))
    }
}
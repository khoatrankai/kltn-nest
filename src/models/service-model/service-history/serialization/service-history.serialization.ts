import { Exclude, Expose } from "class-transformer";
import { ServiceHistory } from "../entities/service-history.entity";
import { Language } from "src/common/enum";

export class ServiceHistorySerialization extends ServiceHistory {
    @Exclude()
    lang: Language;

    constructor(serviceHistory: ServiceHistory, lang: Language) {
        super();
        Object.assign(this, serviceHistory);
        this.lang = lang;
    }

    @Exclude({ toPlainOnly: true })
    override createdAt!: Date;

    @Exclude({ toPlainOnly: true })
    override updatedAt!: Date;

    @Exclude({ toPlainOnly: true })
    override accountId!: string;

    @Exclude({ toPlainOnly: true })
    override serviceExpiration!: number;

    @Expose()
    get isValidate(): boolean {
        
        const serviceExpirationDate = new Date(this.createdAt).getTime() + this.serviceExpiration * 24 * 60 * 60 * 1000;

        return Date.now() < serviceExpirationDate;
    }

    @Expose()
    get startDate() {
        return new Date(this.createdAt).getTime();
    }

    @Expose()
    get endDate() {
        return new Date(this.createdAt).getTime() + this.serviceExpiration * 24 * 60 * 60 * 1000;
    }
}
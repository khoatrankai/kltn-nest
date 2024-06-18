import { Exclude, Expose } from "class-transformer";
import { FollowCompany } from "../entities/follow-company.entity";
import { Company } from "../../companies/entities/company.entity";
import { CompanySerialization } from "../../companies/serialization/company.serialization";

export class FollowCompanySerialization extends FollowCompany {

    @Exclude()
    lang!:string;

    constructor(followCompany: FollowCompany, lang: string) {
        super();
        Object.assign(this, followCompany);
        this.lang = lang;
    }

    @Exclude()
    override company!: Company;

    @Exclude()
    override companyId!: number;

    @Expose()
    get companyInfo() {
        if (!this.company) return null;
        return new CompanySerialization(this.company, this.lang as any);
    }
}
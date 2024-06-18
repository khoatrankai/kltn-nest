import { Exclude, Expose } from "class-transformer";
import { Company } from "../entities/company.entity";
import { CompanyImage } from "../../company-images/entities/company-image.entity";
import { BUCKET_IMAGE_COMPANIES_LOGO } from "src/common/constants";
import { Post } from "src/models/post-models/posts/entities";
import { Profile } from "src/models/profile-models/profiles/entities";

export class AllCompanySerialization extends Company {
    constructor(company: Company) {
        super();
        Object.assign(this, company);
    }

    @Exclude({ toPlainOnly: true })
    override address!: string;

    @Exclude({ toPlainOnly: true })
    override wardId!: string;

    @Exclude({ toPlainOnly: true })
    override phone!: string;

    // @Exclude({ toPlainOnly: true })
    // override email!: string;

    @Exclude({ toPlainOnly: true })
    override website!: string;

    @Exclude({ toPlainOnly: true })
    override description!: string;

    @Exclude({ toPlainOnly: true })
    override companyRoleId!: number;

    @Exclude({ toPlainOnly: true })
    override companySizeId!: number;

    @Exclude({ toPlainOnly: true })
    override categoryId!: number;

    @Exclude({ toPlainOnly: true })
    override createdAt!: any;

    @Exclude({ toPlainOnly: true })
    override updatedAt!: any;

    @Exclude({ toPlainOnly: true })
    override companyImages!: CompanyImage[];

    @Exclude({ toPlainOnly: true })
    override logo!: string;

    @Exclude({ toPlainOnly: true })
    override posts!: Post[];

    @Exclude({ toPlainOnly: true })
    override profile!:Profile;

    @Expose()
    get logoPath() {
        if (!this.logo) return null;
        return `${BUCKET_IMAGE_COMPANIES_LOGO}/${this.id}/${this.logo}`;
    }

    @Expose()
    get amountPosts() {
        return this.posts?.length;
    }
}
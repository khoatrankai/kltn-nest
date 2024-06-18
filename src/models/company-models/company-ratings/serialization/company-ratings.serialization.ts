import { Exclude, Expose, Transform } from "class-transformer";
import { CompanyRating } from "../entities/company-rating.entity";
import { BUCKET_IMAGE_AVATAR } from "src/common/constants";
import { User } from "src/models/user-model/users/entities";

export class CompanyRatingsSerialization extends CompanyRating {
    constructor(companyRating: CompanyRating) {
        super();
        Object.assign(this, companyRating);
    }

    @Exclude({ toPlainOnly: true })
    override account!: User;

    @Transform(({ value }) => new Date(value).getTime())
    override createdAt!: Date;

    @Transform(({ value }) => new Date(value).getTime())
    override updatedAt!: Date;

    @Expose()
    get profileData()  {
        return {
            accountId: this.account.id,
            avatarPath: (this.account.profile && this.account?.profile.avatar) ? `${BUCKET_IMAGE_AVATAR}/${this.account?.profile.avatar}` : null,
            nameHide: this.account.profile ? this.account.profile.name : null,
        }
    } 
}
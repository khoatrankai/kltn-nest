import { Exclude, Expose, Transform } from "class-transformer";
import { ThemeCompany } from "../entities/theme-company.entity";
import { BUCKET_IMAGE_THEME_COMPANIES, BUCKET_IMAGE_THEME_COMPANIES_LOGO } from "src/common/constants/cloudinary.contrant";

export class ThemeCompaniesSerialization extends ThemeCompany {

    constructor(themeCompany: ThemeCompany) {
        super();
        Object.assign(this, themeCompany);
    }

    @Exclude({ toPlainOnly: true })
    override logo!: string

    @Exclude({ toPlainOnly: true })
    override image!: string

    @Transform(({ value }) => new Date(value).getTime())
    override createdAt!: Date;

    @Transform(({ value }) => new Date(value).getTime())
    override updatedAt!: Date;

    @Expose()
    get logoData() {
        if (this.logo) {
            return `${BUCKET_IMAGE_THEME_COMPANIES_LOGO}` + '/' + this.accountId + '/' + this.logo;
        }
        return null;
    }

    @Expose()
    get imageData() {
        if (this.image) {
            return `${BUCKET_IMAGE_THEME_COMPANIES}` + '/' +  this.accountId + '/' + this.image;
        }
        return null;
    }
}
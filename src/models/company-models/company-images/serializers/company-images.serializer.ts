import { Exclude, Expose } from "class-transformer";
import { CompanyImage } from "../entities/company-image.entity";
import { BUCKET_IMAGE_COMPANIES } from "src/common/constants/cloudinary.contrant";

export class CompanyImagesSerializer extends CompanyImage {
    constructor(companyImages: CompanyImage) {
        super();
        Object.assign(this, companyImages);
    }

    @Exclude()
    override companyId!: number;

    @Exclude()
    override createdAt!: Date;

    @Exclude()
    override updatedAt!: Date;

    @Exclude()
    override status!: number;

    @Exclude()
    override company!: any;

    @Exclude()
    override image!: string;

    @Expose()
    get imagePath() {
        if (!this.image) return null;
        return `${BUCKET_IMAGE_COMPANIES}/${this.companyId}/${this.image}`;
    }
}
import { Exclude, Expose } from "class-transformer";
import { ServiceRecruitment } from "../entities/service-recruitment.entity";
import { BUCKET_ICON_SERVICE_RECRUITMENT, BUCKET_ICON_SERVICE_RECRUITMENT_IMAGES } from "src/common/constants/cloudinary.contrant";

export class ServiceRecruitmentSerialization extends ServiceRecruitment {

    @Exclude({ toPlainOnly: true })
    lang!: string;

    constructor(serviceRecruitment: ServiceRecruitment, lang: string) {
        super();
        this.lang = lang;
        Object.assign(this, serviceRecruitment);
    }

    @Exclude({ toPlainOnly: true })
    override icon!: string;
   
    @Exclude({ toPlainOnly: true })
    override createdAt!: Date;

    @Exclude({ toPlainOnly: true })
    override updatedAt!: Date;

    @Exclude({ toPlainOnly: true })
    override price!: number;

    @Exclude({ toPlainOnly: true })
    override discount!: number;

    @Exclude({ toPlainOnly: true })
    override serviceRecruitmentImages: any;

    @Expose()
    get iconData() {
        return this.icon ? `${BUCKET_ICON_SERVICE_RECRUITMENT}` + "/" + this.id + "/" + this.icon : null;
    }

    @Expose()
    get imageData() {
        return this.serviceRecruitmentImages?.map((image: any) => {
            return {
                id: image.id,
                image: `${BUCKET_ICON_SERVICE_RECRUITMENT_IMAGES}` + "/" + this.id + "/" + image.image,
            };
        });
    }

    @Expose()
    get valueNew() {
        return this.price * (1 - this.discount / 100);
    }

    @Expose()
    get valueOld() {
        return this.price;
    }
}
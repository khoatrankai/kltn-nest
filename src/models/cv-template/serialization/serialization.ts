import { Exclude, Transform } from "class-transformer";
import { CvTemplate } from "../entities/cv-template.entity";
import { BUCKET_IMAGE_CV_TEMPLATE } from "src/common/constants/cloudinary.contrant";

export class CvTemplateSerialization extends CvTemplate {

    @Exclude()
    override createdAt!: Date;

    @Transform(({ value }) => `${BUCKET_IMAGE_CV_TEMPLATE}/${value}`)
    override image!: string;
  
}
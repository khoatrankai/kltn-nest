import { Exclude, Expose, Transform } from 'class-transformer';
import { CvInformation } from '../entities/cv-information.entity';
import { MoreCvInformation } from '../../more-cv-information/entities/more-cv-information.entity';
import { BUCKET_IMAGE_CV_INFORMATION } from 'src/common/constants/cloudinary.contrant';

export class CVInformationSerialization extends CvInformation {
  constructor(cvInformation: CvInformation) {
    super();
    Object.assign(this, cvInformation);
  }

  @Exclude({toPlainOnly: true})
  override accountId!:string;

  @Transform(({ value }) => {
    if (!value) {
      return null;
    }
    return BUCKET_IMAGE_CV_INFORMATION + "/" + value;
  })
  override avatar!: string;
  

  @Exclude()
  override moreCvInformation!: MoreCvInformation[];

  @Expose()
  get moreCvInformations(): {
    cvInformationId: string;
    content: string;
    cvIndex: number;
  }[] {
    if (this.moreCvInformation && this.moreCvInformation.length === 0) return [];
    return this.moreCvInformation && this.moreCvInformation.map((moreCvInformation: any) => {
      return {
        cvInformationId: moreCvInformation.cvInformationId,
        content: moreCvInformation.content,
        cvIndex: this.cvIndex,
      };
    });
  }
}

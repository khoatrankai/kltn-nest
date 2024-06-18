import { Exclude, Expose } from "class-transformer";
import { CvExtraInformation } from "../entities/cv-extra-information.entity";
import { MoreCvExtraInformation } from "../../more-cv-extra-information/entities/more-cv-extra-information.entity";

export class CvExtraInformationSerialization extends CvExtraInformation {
    constructor(cvExtraInformation: CvExtraInformation) {
        super();
        Object.assign(this, cvExtraInformation);
    }
    
    @Exclude({ toPlainOnly: true })
    override moreCvExtraInformation!: MoreCvExtraInformation[];

    @Expose()
    get moreCvExtraInformations() {
        if (this.moreCvExtraInformation.length === 0) return [];
        return this.moreCvExtraInformation.map(moreCvExtraInformation => {
            return {
                position: moreCvExtraInformation.position,
                time: moreCvExtraInformation.time,
                company: moreCvExtraInformation.company,
                description: moreCvExtraInformation.description,
                index: moreCvExtraInformation.index,
                padIndex: moreCvExtraInformation.padIndex,
            }
        });
    }
}
import { Language } from "src/common/enum";
import { ProfilesCourse } from "../entities/profiles-course.entity";
import { Exclude, Expose, Transform } from "class-transformer";

export class ProfileCourseSerialization extends ProfilesCourse {

    @Exclude({ toPlainOnly: true })
    lang!: Language;
    
    constructor(profilesCourse: ProfilesCourse, lang: Language) {
      super();
      this.lang = lang;
      Object.assign(this, profilesCourse);
    }

    @Exclude({ toPlainOnly: true })
    override accountId!: string;

    @Exclude({ toPlainOnly: true })
    override courseName!: string;

    @Transform(({ value }) => value ? +value : null)
    override startDate!: string;

    @Transform(({ value }) => value ? +value : null)
    override endDate!: string;

    @Exclude({ toPlainOnly: true })
    override insitiutionName!: string;

    @Expose()
    get name(){
        return this.courseName + ' at ' + this.insitiutionName
    }

}
  
import { Language } from "src/common/enum";
import { ProfilesActivity } from "../entities/profiles-activity.entity";
import { Exclude, Transform } from "class-transformer";

export class ProfilesActitvitesSerialization extends ProfilesActivity {

    @Exclude({ toPlainOnly: true })
    lang!: Language;

    constructor(profilesActivity: ProfilesActivity, lang : Language) {
        super();
        this.lang = lang;
        Object.assign(this, profilesActivity);
    }

    @Exclude({ toPlainOnly: true })
    override accountId!: string;

    @Transform(({ value }) => value ? +value : null)
    override startDate!: string;

    @Transform(({ value }) => value ? +value : null)
    override endDate!: string;
}
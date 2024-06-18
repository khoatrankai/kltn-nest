import { Language } from "src/common/enum";
import { ProfilesAward } from "../entities/profiles-award.entity";
import { Exclude } from "class-transformer";

export class ProfilesAwardSerialization extends ProfilesAward {

    @Exclude({ toPlainOnly: true })
    lang!: Language;

    constructor(profilesAward: ProfilesAward, lang : Language) {
        super();
        this.lang = lang;
        Object.assign(this, profilesAward);
    }

    @Exclude({ toPlainOnly: true })
    override accountId!: string;
}
import { Language } from "src/common/enum";
import { ProfilesHobby } from "../entities/profiles_hobby.entity";
import { Exclude } from "class-transformer";

export class ProfilesHobbiesSerializtion extends ProfilesHobby {

    @Exclude({ toPlainOnly: true })
    lang: Language;

    constructor(profilesHobby: ProfilesHobby, lang : Language) {
        super();
        this.lang = lang;
        Object.assign(this, profilesHobby);
    }

    @Exclude({ toPlainOnly: true })
    override accountId!: string;
}
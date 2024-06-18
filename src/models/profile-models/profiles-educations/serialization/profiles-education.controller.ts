import { Exclude } from "class-transformer";
import { ProfilesEducation } from "../entities/profiles-education.entity";
import { Language } from "src/common/enum";

export class ProfilesEducationSerialization extends ProfilesEducation {

    @Exclude({toPlainOnly: true})
    lang:Language
    
    constructor(profilesEducation: ProfilesEducation, lang: Language) {
        super();
        Object.assign(this, profilesEducation)
        this.lang = lang
    }
}   
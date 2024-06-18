import { Language } from "src/common/enum";
import { ProfilesReference } from "../entities/profiles-reference.entity";
import { Exclude } from "class-transformer";


export class ProfileReferenceSerialization extends ProfilesReference {

    @Exclude({ toPlainOnly: true })
    lang!: Language;
    
    constructor(profilesReference: ProfilesReference, lang: Language) {
      super();
      this.lang = lang;
      Object.assign(this, profilesReference);
    }

    @Exclude({ toPlainOnly: true })
    override accountId!: string;
}
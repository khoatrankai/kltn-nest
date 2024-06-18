import { Language } from "src/common/enum";
import { CandidateBookmark } from "../entities/candidate-bookmark.entity";
import { Exclude, Expose } from "class-transformer";
import { Profile } from "src/models/profile-models/profiles/entities";
import { ProfileBookmarksSerilization } from "./profile-bookmarks.serialization";

export class CandidateBookmarkSerialization extends CandidateBookmark {

    @Exclude({toPlainOnly: true})
    lang!: Language;

    constructor(candidateBookmark: CandidateBookmark, lang: Language) {
        super();
        Object.assign(this, candidateBookmark);
        this.lang = lang;
    }

    @Exclude({toPlainOnly: true})
    override createdAt!: Date;

    @Exclude({toPlainOnly: true})
    override recruitId!: string;

    @Exclude({toPlainOnly: true})
    override candidateId!: string;
    
    @Exclude({ toPlainOnly: true })
    override profile!: Profile;
    

    @Expose() 
    get profileData() {
        if (!this.profile) return null;
        return new ProfileBookmarksSerilization(this.profile, this.lang);
    }
}
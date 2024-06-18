import { Language } from "src/common/enum";
import { ViewJob } from "../entities/view-job.entity";
import { Exclude, Expose } from "class-transformer";
import { PostDetailSeialization } from "src/models/post-models/posts/serialization/posts-detail.serialization";

export class ViewJobsSerialization extends ViewJob {

    @Exclude()
    lang: Language;

    constructor(viewJob: ViewJob, lang: Language) {
        super();
        Object.assign(this, viewJob);
        this.lang = lang;
    }

    @Exclude()
    override accountId!: string;

    @Exclude()
    override postId!: number;

    @Exclude()
    override createdAt!: Date;

    @Exclude()
    override updatedAt!: Date;

    @Exclude()
    override post!: any;

    @Expose()
    get postData() {
        if (!this.post) {
            return null;
        }
        else return new PostDetailSeialization(this.post, this.lang);
    }

    @Expose()
    get created_at() {
        return this.createdAt.getTime();
    }
}
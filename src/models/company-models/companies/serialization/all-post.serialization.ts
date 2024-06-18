import { Exclude, Expose } from "class-transformer";
import { Company } from "../entities/company.entity";
import { BUCKET_IMAGE_COMPANIES_LOGO } from "src/common/constants";
import { PostNormally } from "src/models/post-models/posts/serialization/normally-post.class";
import { Language } from "src/common/enum";

export class AllPostSerialization extends Company {
    
    @Exclude({ toPlainOnly: true })
    limit!: number;

    @Exclude({ toPlainOnly: true })
    page!: number;

    constructor(company: Company, limit: number, page: number) {
        super();
        this.limit = limit;
        this.page = page;
        Object.assign(this, company);
    }

    @Exclude({ toPlainOnly: true })
    override logo!: string;

    @Exclude({ toPlainOnly: true })
    override companyRoleId!: number;

    @Exclude({ toPlainOnly: true })
    override companySizeId!: number;

    @Exclude({ toPlainOnly: true })
    override categoryId!: number;

    @Exclude({ toPlainOnly: true })
    override createdAt!: any;

    @Exclude({ toPlainOnly: true })
    override updatedAt!: any;

    @Exclude({ toPlainOnly: true })
    override posts!: any;

    @Expose()
    get logoPath() {
        return `${BUCKET_IMAGE_COMPANIES_LOGO}/${this.id}/${this.logo}`;
    }

    @Expose()
    get postData() {
        const currentPage = Math.floor(this.page / this.limit) + 1;
        const totalPages = Math.ceil(this.posts.length / this.limit);

        const startIndex = (currentPage - 1) * this.limit;
        const endIndex = startIndex + this.limit;
        const slicedPosts = this.posts.slice(startIndex, endIndex);


        return {
            is_over: currentPage >= totalPages,
            current_page: currentPage,
            total_pages: totalPages,
            data: slicedPosts.map((post: any) => new PostNormally(post, Language.VI))
        };
    }


}
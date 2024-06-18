export class CreatePostResourceDto {
    postId: number | undefined;

    url: string | undefined;

    company: number | undefined;

    constructor(postId: number | undefined, url: string | undefined, company: number | undefined) {
        this.postId = postId;
        this.url = url;
        this.company = company;
    }
}
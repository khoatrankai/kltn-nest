
export class CreatePostCategoriesDto {
    postId!: number;
    categoryId!: number;

    constructor(postId: number, categoryId: number) {
        this.postId = postId;
        this.categoryId = categoryId;
    }
}
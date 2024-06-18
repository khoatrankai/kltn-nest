export class CreatePostsImageDto {
    postId!: number ;

    image: string;  

    type: number;
    
    constructor(postId: number, image: string, type: number = 0) {
        this.postId = postId;
        this.image = image;
        this.type = type;
    }
}

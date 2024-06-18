export class CreateCommunicationNotificationDto {
    
    communicationId!: number;

    commentId!: number;

    // status!: number;

    constructor(communicationId: number, commentId: number) {
        this.communicationId = communicationId;
        this.commentId = commentId;
    }
}

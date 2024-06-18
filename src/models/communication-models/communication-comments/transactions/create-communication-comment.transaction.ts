import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseTransaction } from 'src/providers/database/mariadb/transaction';
import { CreateCommunicationCommentDto } from '../dto/create-communication-comment.dto';
import { CommunicationComment } from '../entities/communication-comment.entity';
import { DataSource, EntityManager } from 'typeorm';
import { CommunicationCommentImagesService } from '../../communication-comment-images/communication-comment-images.service';
import { CreateCommunicationCommentImageDto } from '../../communication-comment-images/dto/create-communication-comment-image.dto';
import { Image } from '../interfaces/communication-comment.interface';
import { BUCKET_IMAGE_COMMUNICATION_COMMENT_UPLOAD } from 'src/common/constants';
import { CreateCommunicationNotificationDto } from '../../communication-notifications/dto/create-communication-notification.dto';
import { CommunicationNotificationsService } from '../../communication-notifications/communication-notifications.service';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';

@Injectable()
export class CreateCommunicationCommentTransaction extends BaseTransaction<
  CreateCommunicationCommentDto,
  CommunicationComment
> {
  constructor(
    dataSource: DataSource,
    private readonly communicationCommentImagesService: CommunicationCommentImagesService,
    private readonly communicationNotificationService: CommunicationNotificationsService,
    private readonly cloudinaryService : CloudinaryService
  ) {
    super(dataSource);
  }
  protected async execute(
    createCommunicationCommentDto: CreateCommunicationCommentDto,
    manager: EntityManager,
  ): Promise<CommunicationComment> {
    try {
      // create new communication comment
      const newCommentEntity = manager.create(
        CommunicationComment,
        createCommunicationCommentDto,
      );

      // save new communication comment
      const newComment = await manager.save(newCommentEntity);

      // create new communication comment images
      if (createCommunicationCommentDto.images) {
        // create new communication comment images dto
        const newCommunicationCommentImageDto = (
          createCommunicationCommentDto.images as any as Image[]
        )?.map(
          (image) =>
            new CreateCommunicationCommentImageDto(
              newComment.id,
              image.originalname,
            ),
        );

        // upload images to s3
        const imageBuffer = createCommunicationCommentDto.images
          ? createCommunicationCommentDto.images.map((image: any) => image)
          : [];

        await this.cloudinaryService.uploadImages(imageBuffer, {
          BUCKET: BUCKET_IMAGE_COMMUNICATION_COMMENT_UPLOAD,
          id: String(newComment.communicationId),
          commentId: String(newComment.id),
        })

        // CALL TRANSACTION
        await this.communicationCommentImagesService.createMany(
          newCommunicationCommentImageDto as CreateCommunicationCommentImageDto[],
          manager,
        );
      }

      // create notifications to owner of communication
      const newNotification = new CreateCommunicationNotificationDto(
        newComment.communicationId,
        newComment.id,
      );

      await this.communicationNotificationService.create(
        newNotification,
        manager,
      );

      // return new communication comment
      return newComment;
    } catch (error) {
      throw new BadRequestException('Method not implemented.');
    }
  }
}

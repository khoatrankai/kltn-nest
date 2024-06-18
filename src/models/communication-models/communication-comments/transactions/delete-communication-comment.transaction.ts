import { BaseTransaction } from 'src/providers/database/mariadb/transaction';
import { DeleteCommunicationCommentDto } from '../dto/delete-communication-comment.dto';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CommunicationComment } from '../entities/communication-comment.entity';
import { DataSource, EntityManager } from 'typeorm';
import { CommunicationCommentImagesService } from '../../communication-comment-images/communication-comment-images.service';
import { Communication } from '../../communications/entities/communication.entity';

@Injectable()
export class DeleteCommunicationCommentTransaction extends BaseTransaction<
  DeleteCommunicationCommentDto,
  CommunicationComment
> {
  constructor(
    dataSource: DataSource,
    private readonly communicationCommentImagesService: CommunicationCommentImagesService, 
  ) {
    super(dataSource);
  }
  protected async execute(
    deleteCommunicationCommentDto: DeleteCommunicationCommentDto,
    manager: EntityManager,
  ): Promise<any> {
    try {
      const checkCommunicationCommentOfUser = await manager.findOne(
        Communication,
        {
          where: {
            accountId: deleteCommunicationCommentDto.accountId,
            id: deleteCommunicationCommentDto.communicationId
          },
        },
      );

      if (checkCommunicationCommentOfUser) {
        const existingCommunicationComment = await manager.findOne(
          CommunicationComment,
          {
            where: {
              id: deleteCommunicationCommentDto.commentId,
              communicationId: checkCommunicationCommentOfUser.id,
            },
          },
        );

        if (existingCommunicationComment) {
          await manager.delete(
            CommunicationComment,
            existingCommunicationComment.id,
          );

          await this.communicationCommentImagesService.delete(
            existingCommunicationComment.id,
            manager,
          );

          return {
            status: HttpStatus.OK,
            message: 'Delete comment succuess'
          }
        }
      } else {
        const existingCommunicationComment = await manager.findOne(
          CommunicationComment,
          {
            where: {
              id: deleteCommunicationCommentDto.commentId,
              accountId: deleteCommunicationCommentDto.accountId,
            },
          },
        );

        if (existingCommunicationComment) {
          await manager.delete(
            CommunicationComment,
            existingCommunicationComment.id,
          );

          await this.communicationCommentImagesService.delete(
            existingCommunicationComment.id,
            manager,
          );

          return {
            status: HttpStatus.OK,
            message: 'Delete comment succuess'
          }
        }
      }

      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Delete failed'
      }

    } catch (error) {
      throw new BadRequestException('Method not implemented.');
    }
  }
}

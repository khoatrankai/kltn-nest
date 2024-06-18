// import { FcmTokensService } from 'src/models/fcm-tokens/fcm-tokens.service';
// import { FirebaseMessagingService } from 'src/services/firebase/messaging/firebase-messaging.service';
import { Injectable } from '@nestjs/common';
import { CreateCommunicationCommentDto } from './dto/create-communication-comment.dto';
import { UpdateCommunicationCommentDto } from './dto/update-communication-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunicationComment } from './entities/communication-comment.entity';
import { Repository } from 'typeorm';
import { CreateCommunicationCommentTransaction } from './transactions/create-communication-comment.transaction';
import { UpdateCommunicationCommentTransaction } from './transactions/update-communication-comment.transaction';
import { DeleteCommunicationCommentDto } from './dto/delete-communication-comment.dto';
import { DeleteCommunicationCommentTransaction } from './transactions/delete-communication-comment.transaction';

@Injectable()
export class CommunicationCommentsService {
  constructor(
    @InjectRepository(CommunicationComment)
    private readonly communicationCommentRepository: Repository<CommunicationComment>,
    private readonly createCommunicationCommentTransaction: CreateCommunicationCommentTransaction,
    private readonly updateCommunicationCommentTransaction: UpdateCommunicationCommentTransaction,
    private readonly deleteCommunicationCommentTransaction: DeleteCommunicationCommentTransaction,
    // private readonly firebaseMessagingService: FirebaseMessagingService,
    // private readonly fcmTokensService: FcmTokensService,
  ) {}
  async create(createCommunicationCommentDto: CreateCommunicationCommentDto) {
    try {
      const newCommunicationComment =
        await this.createCommunicationCommentTransaction.run(
          createCommunicationCommentDto,
        );


        if (newCommunicationComment) {
        // const ownerCommunication = await this.communicationCommentRepository
        // .createQueryBuilder('communication_comments')
        // .leftJoinAndSelect('communication_comments.communications', 'communication')
        // .where('communication_comments.id = :id', { id: newCommunicationComment.id })
        // .getOne();

        // if (ownerCommunication && newCommunicationComment.accountId !== ownerCommunication.communications.accountId) {
        //   const fcmTokens = await this.fcmTokensService.readByAccountId(
        //     ownerCommunication.communications.accountId,
        //   );

        //   if (fcmTokens.length > 0) {
        //     const notification = {
        //       title: "Bình luận mới",
        //       body: newCommunicationComment.content,
        //     };

        //     const data = {
        //       "type": 'new-comment',
        //       "communication_id": newCommunicationComment.communicationId.toString(),
        //       "comment_id": newCommunicationComment.id.toString(),
        //     }

        //     this.firebaseMessagingService.sendMulticast(
        //       fcmTokens.map((fcmToken) => fcmToken.token),
        //       notification,
        //       false,
        //       data,
        //     );
        //   }
        // }
      }


      return newCommunicationComment;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    return await this.communicationCommentRepository.find({
      where: { communicationId: id },
      relations: ['communicationCommentImages', 'profile'],
    });
  }

  async update(updateCommunicationCommentDto: UpdateCommunicationCommentDto) {
    try {
      const newCommunicationComment =
        await this.updateCommunicationCommentTransaction.run(
          updateCommunicationCommentDto,
        );

      return newCommunicationComment;
    } catch (error) {
      throw error;
    }
  }

  //count communication comments by communication id
  async countCommunicationComments(communicationId: number) {
    return await this.communicationCommentRepository.count({
      where: { communicationId },
    });
  }


  async delete(deleteCommunicationCommentDto : DeleteCommunicationCommentDto) {
    try {
      const deleteCommunicationCommentById =
        await this.deleteCommunicationCommentTransaction.run(
          deleteCommunicationCommentDto,
        );

      return deleteCommunicationCommentById;
    } catch (error) {
      throw error;
    }
  }
}

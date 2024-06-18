import { Module } from '@nestjs/common';
import { CommunicationCommentsService } from './communication-comments.service';
import { CommunicationCommentsController } from './communication-comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunicationComment } from './entities/communication-comment.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { AWSModule } from 'src/providers/storage/aws/provider.module';
import { CommunicationCommentImagesModule } from '../communication-comment-images/communication-comment-images.module';
import { CreateCommunicationCommentTransaction } from './transactions/create-communication-comment.transaction';
import { UpdateCommunicationCommentTransaction } from './transactions/update-communication-comment.transaction';
import { DeleteCommunicationCommentTransaction } from './transactions/delete-communication-comment.transaction';
import { CommunicationNotificationsModule } from '../communication-notifications/communication-notifications.module';
import { FcmTokensModule } from 'src/models/fcm-tokens/fcm-tokens.module';
import { FirebaseMessagingModule } from 'src/services/firebase/messaging/firebase-messaging.module';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommunicationComment]),
    JwtAccessTokenServiceModule,
    CommunicationCommentImagesModule,
    AWSModule,
    CommunicationNotificationsModule,
    FirebaseMessagingModule,
    FcmTokensModule,
  ],
  controllers: [CommunicationCommentsController],
  providers: [
    CommunicationCommentsService,
    CreateCommunicationCommentTransaction,
    UpdateCommunicationCommentTransaction,
    DeleteCommunicationCommentTransaction,
    CloudinaryService
  ],
  exports: [CommunicationCommentsService],
})
export class CommunicationCommentsModule {}

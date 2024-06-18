import { Module } from '@nestjs/common';
import { PostNotificationsService } from './post-notifications.service';
// import { PostNotificationsController } from './post-notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostNotification } from './entities/post-notification.entity';
import { FirebaseMessagingModule } from 'src/services/firebase/messaging/firebase-messaging.module';
import { FcmTokensModule } from 'src/models/fcm-tokens/fcm-tokens.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostNotification,
    ]),
    FirebaseMessagingModule,
    FcmTokensModule,
  ],
  // controllers: [PostNotificationsController],
  providers: [PostNotificationsService],
  exports: [PostNotificationsService],
})
export class PostNotificationsModule {}

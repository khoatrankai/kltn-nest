import { Injectable } from '@nestjs/common';
import { CreatePostNotificationDto } from './dto/create-post-notification.dto';
import { UpdatePostNotificationDto } from './dto/update-post-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostNotification } from './entities/post-notification.entity';
import { Repository } from 'typeorm';
import { FirebaseMessagingService } from 'src/services/firebase/messaging/firebase-messaging.service';
import { FcmTokensService } from 'src/models/fcm-tokens/fcm-tokens.service';
import { Logger } from '@nestjs/common';
import { CreatePostDto } from 'src/models/post-models/posts/dto/create-post.dto';

@Injectable()
export class PostNotificationsService {

  constructor(
    @InjectRepository(PostNotification)
    private readonly postNotificationRepository: Repository<PostNotification>,
    private readonly firebaseMessagingService: FirebaseMessagingService,
    private readonly fcmTokenService: FcmTokensService,
  ) {}

  create(_createPostNotificationDto: CreatePostNotificationDto) {
    const postNotification = this.postNotificationRepository.create(_createPostNotificationDto);
    return this.postNotificationRepository.save(postNotification);
  }

  findAll() {
    return `This action returns all postNotifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postNotification`;
  }

  update(id: number, _updatePostNotificationDto: UpdatePostNotificationDto) {
    return `This action updates a #${id} postNotification`;
  }

  remove(id: number) {
    return `This action removes a #${id} postNotification`;
  }

  async createWhenCreatePost(post: CreatePostDto, postId: number) {

    // get all tokens
    const tokens = await this.fcmTokenService.getTokensWhenNewPost(post);

    if (tokens.length === 0) {
      Logger.log('No token to send notification');
      return [];
    }

    const accounts = new Set<string>();

    // create notification for each token
    tokens.forEach((token) => {
      accounts.add(token.accountId);
    });

    const dto = Array.from(accounts).map((accountId) => {
      return {
        accountId,
        postId,
      };
    });


    // save all dto in set
    const notificationCreated = await this.postNotificationRepository.save([...dto]);

    // send notification to all tokens
    const notification = {
      title: "Bạn có một việc làm mới",
      body: post.title,
    };

    const data = {
      "post_id": postId.toString(),
      "type": "3",
      "type_text": "keyword",
    };

    const [jobs, tokensSent] = await this.firebaseMessagingService.sendNotificationWhenNewPost(
      tokens.map((token) => token.token),
      notification,
      data,
    );

    return [notificationCreated, jobs, tokensSent];
  }
}

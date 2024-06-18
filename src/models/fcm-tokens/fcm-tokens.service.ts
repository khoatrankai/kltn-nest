import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FcmTokensEntity } from './entities/fcm-tokens.entity';
import { isArray } from 'class-validator';
import { CreatePostDto } from '../post-models/posts/dto/create-post.dto';

@Injectable()
export class FcmTokensService {
    constructor(
        @InjectRepository(FcmTokensEntity)
        private readonly fcmTokensRepository: Repository<FcmTokensEntity>
    ) {}

    async readByAccountId(accountId: string): Promise<FcmTokensEntity[]> {
        return await this.fcmTokensRepository.find({ 
            // relations: ['user'],
            where: { accountId }
        });
    }

    async delete(fcmToken: string) {
        return await this.fcmTokensRepository.delete({ token: fcmToken });
    }

    async getTokensWhenNewPost(post: CreatePostDto): Promise<FcmTokensEntity[]> {
        return await this.fcmTokensRepository
            .query(`
                SELECT fcm_tokens.token, fcm_tokens.account_id as accountId
                FROM fcm_tokens
                INNER JOIN keywords_notification
                ON fcm_tokens.account_id = keywords_notification.account_id
                INNER JOIN type_notification_platform
                ON fcm_tokens.account_id = type_notification_platform.account_id
                INNER JOIN wards
                ON wards.id = '${post.wardId}'
                INNER JOIN child_categories
                ON child_categories.id IN (${isArray(post.categoriesId) ? post.categoriesId.join(',') : post.categoriesId})
                WHERE type_notification_platform.push_status = 1
                AND keywords_notification.status = 1
                AND "%${post.title}%" LIKE CONCAT('%', keywords_notification.keyword, '%')
                AND fcm_tokens.account_id != '${post.accountId}'
                AND (keywords_notification.district_status = 0 OR keywords_notification.district_id = wards.district_id)
                AND (keywords_notification.category_status = 0 OR keywords_notification.category_id = child_categories.parent_category_id)
                GROUP BY fcm_tokens.token
            `);
    }
}

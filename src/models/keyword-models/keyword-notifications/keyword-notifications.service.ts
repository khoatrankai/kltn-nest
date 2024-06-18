import { TypeNotificationPlatformService } from './../type-notification-platform/type-notification-platform.service';
import { CreateKeywordTransaction } from './transactions/create-keyword.transaction';
import { Injectable } from '@nestjs/common';
import { CreateKeywordNotificationDto } from './dto/create-keyword-notification.dto';
import { UpdateKeywordNotificationDto } from './dto/update-keyword-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { KeywordNotification } from './entities/keyword-notification.entity';
import { Repository } from 'typeorm';
import { UpdateKeywordTransaction } from './transactions/update-keyword.transaction';

@Injectable()
export class KeywordNotificationsService {
  constructor(
    @InjectRepository(KeywordNotification)
    private readonly keywordNotificationRepository: Repository<KeywordNotification>,
    private readonly createKeywordTransaction: CreateKeywordTransaction,
    private readonly updateKeywordTransaction: UpdateKeywordTransaction,
    private readonly typeNotificationPlatformService: TypeNotificationPlatformService,
  ) {}
  async create(createKeywordNotificationDto: CreateKeywordNotificationDto) {
    try {
      // Transaction when create keyword notification
      // create keyword categories, keyword districts
      const newKeywordNotification = await this.createKeywordTransaction.run(
        createKeywordNotificationDto,
      );
      return newKeywordNotification;
    } catch (error) {
      throw error;
    }
  }

  async findAll(id: string) {
    try {
      const typeNotificationPlatform = await this.typeNotificationPlatformService.findByAccountId(
        id,
      );
      return {
        status: {
          emailStatus: typeNotificationPlatform?.emailStatus || 0,
          pushStatus: typeNotificationPlatform?.pushStatus || 0,
        },
        data: await this.keywordNotificationRepository.find({
          relations: ['categories', 'districts', 'districts.province', 'categories.parentCategory'],
          where: {
            accoundId: id,
          },
          order: {
            createdAt: 'DESC',
          },
        })
      }
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateKeywordNotificationDto: UpdateKeywordNotificationDto,
  ) {
    try {
      // Transaction when update keyword notification
      // update keyword categories, keyword districts
      updateKeywordNotificationDto.id = id;
      return await this.updateKeywordTransaction.run(
        updateKeywordNotificationDto,
      );
    } catch (error) {
      throw error;
    }
  }

  async findPlatformStatus(id: string): Promise<any> {
    return await this.keywordNotificationRepository
      .createQueryBuilder('type_notification_platform')
      .select(['email_status', 'push_status'])
      .where('type_notification_platform.accoundId = :id', { id })
      .getOne();
  }
}

import { TypeNotificationPlatformService } from './../../type-notification-platform/type-notification-platform.service';
import { DataSource, EntityManager } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseTransaction } from 'src/providers/database/mariadb/transaction';
import { CreateKeywordNotificationDto } from '../dto/create-keyword-notification.dto';
import { KeywordNotification } from '../entities/keyword-notification.entity';
import { KeywordCategoriesService } from '../../keyword-categories/keyword-categories.service';
import { KeywordDistrictsService } from '../../keyword-districts/keyword-districts.service';

@Injectable()
export class CreateKeywordTransaction extends BaseTransaction<
    CreateKeywordNotificationDto,
    KeywordNotification
> {
    constructor(
        dataSource: DataSource,
        // private readonly keywordNotification
        private readonly keywordCategoriesService: KeywordCategoriesService,
        private readonly keywordDistrictsService: KeywordDistrictsService,
        private readonly typeNotificationPlatformService: TypeNotificationPlatformService,
    ) {
        super(dataSource);
    }

    protected async execute(
        createKeywordNotificationDto: CreateKeywordNotificationDto,
        manager: EntityManager,
    ): Promise<KeywordNotification> {
        try {
            const LIMIT_KEYWORD_NOTIFICATION = 10;

            const currentKeywordNotification = await manager.find(KeywordNotification, {
                where: {
                    accoundId: createKeywordNotificationDto.accoundId,
                },
            });

            if (currentKeywordNotification.length >= LIMIT_KEYWORD_NOTIFICATION) {
                throw new Error(`You can only create ${LIMIT_KEYWORD_NOTIFICATION} keyword notifications`);
            }

            const newKeywordNotificationEntity = manager.create(KeywordNotification, {
                ...createKeywordNotificationDto,
                districtId: createKeywordNotificationDto.districtsId[0],
                categoryId: 2,
            });

            const newKeywordNotification = await manager.save(newKeywordNotificationEntity);

            const keywordCategoriesDto = createKeywordNotificationDto.categoriesId.map(
                (categoryId) => ({
                    keywordId: newKeywordNotification.id,
                    categoryId,
                }),
            );

            const keywordDistrictsDto = createKeywordNotificationDto.districtsId.map(
                (districtId) => ({
                    keywordId: newKeywordNotification.id,
                    districtId,
                }),
            );

            await this.keywordCategoriesService.createMany(keywordCategoriesDto, manager);
            await this.keywordDistrictsService.createMany(keywordDistrictsDto, manager);

            const typeNotificationPlatform = await this.typeNotificationPlatformService
            .findByAccountId(createKeywordNotificationDto.accoundId);

            if (!typeNotificationPlatform) {
                this.typeNotificationPlatformService.create(createKeywordNotificationDto.accoundId);
            }

            return newKeywordNotification;
        } catch (error) {
            // if (error instanceof Error) {                
            //     throw new Error(error.message);
            // }

            throw new BadRequestException('Create keyword notification failed');
        }
    }
}

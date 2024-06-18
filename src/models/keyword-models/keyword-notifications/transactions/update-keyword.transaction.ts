import { DataSource, EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseTransaction } from 'src/providers/database/mariadb/transaction';
import { KeywordNotification } from '../entities/keyword-notification.entity';
import { KeywordCategoriesService } from '../../keyword-categories/keyword-categories.service';
import { KeywordDistrictsService } from '../../keyword-districts/keyword-districts.service';
import { UpdateKeywordNotificationDto } from '../dto/update-keyword-notification.dto';
import { CreateKeywordCategoriesDto } from '../../keyword-categories/dto/create-keyword-categories.dto';
import { CreateKeywordDistrictDto } from '../../keyword-districts/dto/create-keyword-district.dto';

@Injectable()
export class UpdateKeywordTransaction extends BaseTransaction<
    UpdateKeywordNotificationDto,
    KeywordNotification
> {
    constructor(
        dataSource: DataSource,
        // private readonly keywordNotification
        private readonly keywordCategoriesService: KeywordCategoriesService,
        private readonly keywordDistrictsService: KeywordDistrictsService,
    ) {
        super(dataSource);
    }

    protected async execute(
        updateKeywordNotificationDto: UpdateKeywordNotificationDto,
        manager: EntityManager,
    ): Promise<KeywordNotification> {
        try {
            const newKeywordNotificationEntity = manager.create(KeywordNotification, {
                ...updateKeywordNotificationDto,
            });

            /**
             * Save keyword notification
             */
            const newKeywordNotification = await manager.save(newKeywordNotificationEntity);

            /**
             * Delete all keyword categories and keyword districts
             */
            await this.keywordCategoriesService.delete(newKeywordNotification.id, manager);

            /**
             * Delete all keyword districts
             */
            await this.keywordDistrictsService.delete(newKeywordNotification.id, manager);


            /**
             * Create new keyword categories and keyword districts
             */
            if (updateKeywordNotificationDto.categoriesId) {
                const keywordCategoriesDto = updateKeywordNotificationDto.categoriesId.map(
                    (categoryId) => new CreateKeywordCategoriesDto(newKeywordNotification.id, categoryId),
                );
                await this.keywordCategoriesService.createMany(keywordCategoriesDto, manager);
            }

            /**
             * Create new keyword districts
             */
            if (updateKeywordNotificationDto.districtsId) {
                const keywordDistrictsDto = updateKeywordNotificationDto.districtsId.map(
                    (districtId) => new CreateKeywordDistrictDto(newKeywordNotification.id, districtId),
                );
    
                await this.keywordDistrictsService.createMany(keywordDistrictsDto, manager);
            }

            return newKeywordNotification;
        } catch (error) {
            throw new Error('Error creating keyword notification');
        }
    }
}

import { Injectable } from '@nestjs/common';
import { CreateTypeNotificationPlatformDto } from './dto/create-type-notification-platform.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeNotificationPlatform } from './entities/type-notification-platform.entity';
import { Repository } from 'typeorm';
import { ProfilesService } from 'src/models/profile-models/profiles/profiles.service';
import { FcmTokensService } from 'src/models/fcm-tokens/fcm-tokens.service';

@Injectable()
export class TypeNotificationPlatformService {
  constructor(
    @InjectRepository(TypeNotificationPlatform)
    private readonly typeNotificationPlatformRepository: Repository<TypeNotificationPlatform>,
    private readonly profilesService: ProfilesService,
    private readonly fcmTokensService: FcmTokensService
  ){}

  /**
   * 
   * @param id - account id
   */
  async create(id : string) {
    try {
      const createTypeNotificationPlatformDto = new CreateTypeNotificationPlatformDto()

      createTypeNotificationPlatformDto.accountId = id || '';

      const emailProfiles = await this.profilesService.getProfileEmail(createTypeNotificationPlatformDto.accountId)

      createTypeNotificationPlatformDto.emailStatus = (emailProfiles && emailProfiles.email) ? 1 : 0

      const pushStatus =  await this.fcmTokensService.readByAccountId(createTypeNotificationPlatformDto.accountId)

      createTypeNotificationPlatformDto.pushStatus = (pushStatus.length > 0) ? 1 : 0

      const newTypeNotificationPlatform = this.typeNotificationPlatformRepository.create(createTypeNotificationPlatformDto)

      await this.typeNotificationPlatformRepository.save(newTypeNotificationPlatform)

    } catch (error) {
      throw error
    }
  }

  async findByAccountId(id: string) {
    try {
      return await this.typeNotificationPlatformRepository.findOne({
        where: {
          accountId: id
        }
      })
    } catch (error) {
      throw error
    }
  }
}

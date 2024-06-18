import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfileLanguageDto } from './dto/create-profile-language.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProfileLanguage } from './entities/profile-language.entity';
import { LanguageTypesService } from '../types/language-types/language-types.service';
import { DeleteProfilesLanguageDto } from './dto/delete-profile-language.dto';
import { UpdateProfileLanguageDto } from './dto/update-profile-language.dto';

@Injectable()
export class ProfileLanguagesService {
  constructor(
    @InjectRepository(ProfileLanguage)
    private readonly profilesLanguageRepository: Repository<ProfileLanguage>,
    private readonly languageTypesService: LanguageTypesService,
  ) {}
  async create(createProfileLanguageDto: CreateProfileLanguageDto) {
    try {
      const dataType = await this.languageTypesService.findOne(
        createProfileLanguageDto.languageLevelId,
      );

      if (!dataType) {
        throw new BadRequestException('Level type not found');
      }

      const dataProfileLanguage = await this.profilesLanguageRepository.findOne(
        {
          where: {
            languageLevelId: createProfileLanguageDto.languageLevelId,
            accountId: createProfileLanguageDto.accountId,
            languageName: createProfileLanguageDto.languageName,
          },
        },
      );

      if (dataProfileLanguage) {
        throw new BadRequestException('Languege already exists');
      }

      const profilesLanguageEntity = this.profilesLanguageRepository.create(
        createProfileLanguageDto,
      );

      return await this.profilesLanguageRepository.save(profilesLanguageEntity);
    } catch (error) {
      throw error;
    }
  }

  async findAll(id: string) {
    try {
      return await this.profilesLanguageRepository.find({
        where: { accountId: id },
        relations: ['levelTypeLanguage'],
      });
    } catch (error) {
      throw error;
    }
  }

  async removeAll(data: DeleteProfilesLanguageDto) {
    try {
      const idSet = new Set(data.ids);

      const result = await this.profilesLanguageRepository.delete({
        id: In([...idSet]),
        accountId: data.accountId,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(dto: UpdateProfileLanguageDto) {
    try {
      const dataProfileLanguage = await this.profilesLanguageRepository.findOne(
        {
          where: {
            languageLevelId: dto.languageLevelId,
            accountId: dto.accountId,
            languageName: dto.languageName,
          },
        },
      );

      if (dataProfileLanguage) {
        throw new BadRequestException('Languege already exists');
      }

      await this.profilesLanguageRepository.update(
        { id: dto.id, accountId: dto.accountId },
        dto,
      );
    } catch (error) {
      throw error;
    }
  }
}

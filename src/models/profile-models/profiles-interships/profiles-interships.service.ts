import { Injectable } from '@nestjs/common';
import { CreateProfilesIntershipDto } from './dto/create-profiles-intership.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProfilesIntership } from './entities/profiles-intership.entity';
import { UpdateProfilesIntershipDto } from './dto/update-profiles-intership.dto';
import { DeleteProfilesIntershipDto } from './dto/delete-profile-intership.dto';

@Injectable()
export class ProfilesIntershipsService {
  constructor(
    @InjectRepository(ProfilesIntership)
    private profilesIntershipRepository: Repository<ProfilesIntership>,
  ) {}
  async create(createProfilesIntershipDto: CreateProfilesIntershipDto) {
    try {
      const newProfilesIntershipEntity =
        this.profilesIntershipRepository.create(createProfilesIntershipDto);

      return await this.profilesIntershipRepository.save(
        newProfilesIntershipEntity,
      );
    } catch (error) {
      throw error;
    }
  }

  async removeAll(data: DeleteProfilesIntershipDto) {
    try {
      
      const idSet = new Set(data.ids);

      const result = await this.profilesIntershipRepository.delete({
        id: In([...idSet]),
        accountId : data.accountId,
      });

      return result
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, dto: UpdateProfilesIntershipDto) {
    try {
      return await this.profilesIntershipRepository.update(
        {
          id,
          accountId: dto.accountId,
        },
        dto,
      );
    } catch (error) {
      throw error;
    }
  }
}

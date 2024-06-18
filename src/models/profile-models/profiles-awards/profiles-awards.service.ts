import { Injectable } from '@nestjs/common';
import { CreateProfilesAwardDto } from './dto/create-profiles-award.dto';
import { UpdateProfilesAwardDto } from './dto/update-profiles-award.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProfilesAward } from './entities/profiles-award.entity';
import { DeleteProfilesAwardDto } from './dto/delete-profile-award.dto';

@Injectable()
export class ProfilesAwardsService {
  constructor(
    @InjectRepository(ProfilesAward)
    private readonly profilesAwardsRepository: Repository<ProfilesAward>,
  ) {}
  async create(createProfilesAwardDto: CreateProfilesAwardDto) {
    try {
      const profilesAward = this.profilesAwardsRepository.create(
        createProfilesAwardDto,
      );

      return await this.profilesAwardsRepository.save(profilesAward);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateProfilesAwardDto: UpdateProfilesAwardDto) {
    try {
      return await this.profilesAwardsRepository.update(
        {
          id,
          accountId: updateProfilesAwardDto.accountId,
        },
        updateProfilesAwardDto,
      ); 
    } catch (error) {
      throw error;
    }
  }

  async removeMany(data : DeleteProfilesAwardDto) {
    try {

      const idSet = new Set(data.ids);

      const result = await this.profilesAwardsRepository.delete({
        id: In([...idSet]),
        accountId: data.accountId,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }
}

import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfilesHobbyDto } from './dto/create-profiles_hobby.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfilesHobby } from './entities/profiles_hobby.entity';

@Injectable()
export class ProfilesHobbiesService {
  constructor(
    @InjectRepository(ProfilesHobby)
    private readonly profilesHobbyRepository: Repository<ProfilesHobby>,
  ) {}
  async createOrUpdate(createProfilesHobbyDto: CreateProfilesHobbyDto) {
    try {
      const dataProfilesHobby = await this.profilesHobbyRepository.findOne({
        where: {
          accountId: createProfilesHobbyDto.accountId,
        },
      });

      if (dataProfilesHobby) {
        dataProfilesHobby.description = createProfilesHobbyDto.description;

        await this.profilesHobbyRepository.save(dataProfilesHobby);

        return {
          statusCode: HttpStatus.OK,
          message: 'Update success',
        };
      }

      const newProfilesHobbyEntity = this.profilesHobbyRepository.create(
        createProfilesHobbyDto,
      );

      return {
        statusCode: HttpStatus.CREATED,
        data: await this.profilesHobbyRepository.save(newProfilesHobbyEntity),
      };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.profilesHobbyRepository.delete({
        accountId: id,
      });
    } catch (error) {
      throw error;
    }
  }
}

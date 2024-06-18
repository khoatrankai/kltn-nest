import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfilesEducation } from './entities/profiles-education.entity';
import { CreateProfilesEducationDto } from './dto/create-profiles-educations.dto';
import { DeleteProfilesEducationDto } from './dto/delete-profiles-educations.dto';
import { UpdateProfilesEducationDto } from './dto/update-profiles-education.dto';

@Injectable()
export class ProfilesEducationsService {
  constructor(
    @InjectRepository(ProfilesEducation)
    private readonly profilesEducationsRepository: Repository<ProfilesEducation>,
  ) {}

  async create(createProfilesEducationDto: CreateProfilesEducationDto) {
    try {
      const newProfilesEducation = this.profilesEducationsRepository.create(
        createProfilesEducationDto,
      );

      return await this.profilesEducationsRepository.save(newProfilesEducation);
    } catch (error) {
      throw error;
    }
  }

  async update(updateProfilesEducationDto: UpdateProfilesEducationDto) {
    try {
      const { educationId, ...data } = updateProfilesEducationDto;

      await this.profilesEducationsRepository.update({ id: educationId }, data);
    } catch (error) {
      throw error;
    }
  }

  async remove(deleteProfilesEducationDto: DeleteProfilesEducationDto) {
    try {
      await this.profilesEducationsRepository.delete(
        deleteProfilesEducationDto.educationId,
      );
    } catch (error) {
      throw error;
    }
  }
}

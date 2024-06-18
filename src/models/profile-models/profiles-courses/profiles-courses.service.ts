import { Injectable } from '@nestjs/common';
import { CreateProfilesCourseDto } from './dto/create-profiles-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProfilesCourse } from './entities/profiles-course.entity';
import { DeleteProfilesCourseDto } from './dto/delete-profile-course.dto';
import { UpdateProfilesCourseDto } from './dto/update-profiles-course.dto';

@Injectable()
export class ProfilesCoursesService {
  constructor(
    @InjectRepository(ProfilesCourse)
    private readonly profilesCourseRepository: Repository<ProfilesCourse>,
  ) {}
  async create(createProfilesCourseDto: CreateProfilesCourseDto) {
    try {
      const newProfilesEntity = this.profilesCourseRepository.create(
        createProfilesCourseDto,
      );

      return await this.profilesCourseRepository.save(newProfilesEntity);
    } catch (error) {
      throw error;
    }
  }

  async removeAll(data: DeleteProfilesCourseDto) {
    try {

      const idSet = new Set(data.ids);

      const result = await this.profilesCourseRepository.delete({
        id: In([...idSet]),
        accountId: data.accountId,
      });

      return result;

    } catch (error) {
      throw error;
    }
  }

  async update(id: number, data: UpdateProfilesCourseDto) {
    try {
      const profileCourseEntity = this.profilesCourseRepository.create(
        data,
      );

      return await this.profilesCourseRepository.update(id, profileCourseEntity);
    } catch (error) {
      throw error;
    }
  }
}

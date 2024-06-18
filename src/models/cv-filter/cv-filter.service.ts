import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../profile-models/profiles/entities';
import { FilterCandidatesDto } from './dto/filter-candidates.dto';

@Injectable()
export class CvFilterService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async filterCandidatesWithCondition(query: FilterCandidatesDto) {
    try {
      const {
        addresses,
        ageMax,
        ageMin,
        categories,
        educations,
        gender,
        limit,
        page,
      } = query;

      if (ageMin > ageMax) {
        throw new BadRequestException('Age min must be less than age max');
      }

      const candidates = this.profileRepository
        .createQueryBuilder('profiles')
        .leftJoinAndSelect('profiles.childCategories', 'childCategory')
        .leftJoinAndSelect('profiles.profilesEducations', 'profilesEducations')
        .leftJoinAndSelect('profiles.profilesLocations', 'profilesLocations')
        .leftJoinAndSelect('childCategory.parentCategory', 'parentCategory')
        .leftJoinAndSelect('profilesEducations.academicType', 'academicType')
        .where('profiles.isSearch = :isSearch', { isSearch: 1 });

      if (addresses) {
        candidates.andWhere('profilesLocations.id IN (:...addresses)', {
          addresses: Array.isArray(addresses) ? addresses : [addresses],
        });
      }

      if (categories) {
        candidates.andWhere('childCategory.id IN (:...categories)', {
          categories: Array.isArray(categories)
            ? categories.map((item) => +item)
            : [+categories],
        });
      }

      if (educations) {
        candidates.andWhere(
          'profilesEducations.academicTypeId IN (:...educations)',
          {
            educations: Array.isArray(educations)
              ? educations.map((item) => +item)
              : [+educations],
          },
        );
      }

      if (ageMin) {
        const birthdayMin = +new Date(
          new Date().getFullYear() - ageMin + 1,
          1,
          1,
        );
        candidates.andWhere('profiles.birthday <= :birthdayMin', {
          birthdayMin,
        });
      }

      if (ageMax) {
        const birthdayMax = +new Date(+new Date().getFullYear() - ageMax, 1, 1);
        candidates.andWhere('profiles.birthday >= :birthdayMax', {
          birthdayMax,
        });
      }

      if (gender === 0 || gender === 1) {
        candidates.andWhere('profiles.gender = :gender', {
          gender,
        });
      }

      const total = await candidates.getCount();

      const data = await candidates
        .take(limit ? limit : 20)
        .skip(page ? page * limit : 0)
        .orderBy('profiles.updatedAt', 'DESC')
        .getMany();

      return {
        total,
        data,
        is_over:
          data.length === total ? true : data.length < limit ? true : false,
      };
    } catch (error) {
      throw error;
    }
  }
}

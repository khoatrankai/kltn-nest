import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/models/post-models/posts/entities';
import { Profile } from 'src/models/profile-models/profiles/entities';
import { Not, Repository } from 'typeorm';

const simalarity = (a: Profile, b: any) => {
  const lengthCategory = b.categoriesFilter.length;

  const onlyPercentCategory = 40 / lengthCategory;

  let totalPrecents = 0;

  if (a.jobType && (a?.jobType.id === b.jobType)) {
    totalPrecents += 20;
  }

  if (
    a.profilesLocations
      .map((location) => location.id)
      .includes(b.wardFilter.districtId)
  ) {
    totalPrecents += 20;
  }

  a.childCategories.map((category) => {
    if (
      b.categoriesFilter
        .map((item: any) => item.childrentId)
        .includes(category.id)
    ) {
      totalPrecents += onlyPercentCategory;
    }
  });

  return totalPrecents;
};

@Injectable()
export class UserSuggestService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}
  async findAll(id: number, accountId: string, page: number, limit: number) {
    try {
      const posts = await this.postRepository.findOne({
        where: { accountId, id },
        relations: ['ward', 'jobTypeData', 'categories'],
        select: ['wardId', 'id', 'jobType'],
      });

      const wardFilter = {
        wardId: posts?.ward.id,
        districtId: posts?.ward.districtId,
      };

      const categoriesFilter = posts?.categories.map((category) => {
        return {
          childrentId: category.id,
          parentId: category.parentCategoryId,
        };
      });

      const postsFilter = {
        jobType: posts?.jobType,
        wardFilter,
        categoriesFilter,
      };

      const profileData = await this.profileRepository.find({
        relations: [
          'user',
          'province',
          'profilesLocations',
          'profilesLocations.province',
          'childCategories',
          'childCategories.parentCategory',
          'jobType',
        ],
        order: {
          updatedAt: 'DESC',
        },
        where: {
          user: {
            role: Not(3),
          },
        },
        take: 100,
      });

      const result = profileData.map((item) => {
        return {
          ...item,
          percent: simalarity(item as Profile, postsFilter),
        };
      });

      // filter results by percent > 0

      const filterResult = result.filter((item) => item.percent > 0);

      filterResult.sort((a, b) => b.percent - a.percent);

      const startIndex = (page) * limit;
      const endIndex = startIndex + limit;

      const paginatedResult = filterResult.slice(startIndex, endIndex);

      return paginatedResult;
    } catch (error) {
      throw error;
    }
  }
}

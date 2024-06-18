import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateViewProfileDto } from './dto/create-view_profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ViewProfile } from './entities/view_profile.entity';
import { UserService } from '../user-model/users/users.service';
import { BUCKET_IMAGE_COMPANIES_LOGO } from 'src/common/constants';

@Injectable()
export class ViewProfilesService {
  constructor(
    @InjectRepository(ViewProfile)
    private viewProfileRepository: Repository<ViewProfile>,
    private readonly userService: UserService,
  ) { }
  async create(createViewProfileDto: CreateViewProfileDto) {
    const TOTAL_IN_DAY = 10;

    const user = await this.userService.findRoleById(
      createViewProfileDto.recruitId,
    );

    if (user?.role !== 3) {
      throw new BadRequestException('Is not cruitment');
    }

    const result = await this.viewProfileRepository
      .createQueryBuilder('view_profiles')
      .where('view_profiles.recruitId = :recruitId', {
        recruitId: createViewProfileDto.recruitId,
      })
      .andWhere('DATE(view_profiles.created_at) = CURDATE()')
      .getCount();

    if (result >= TOTAL_IN_DAY) {
      return 0;
    }

    const newEntity = this.viewProfileRepository.create(createViewProfileDto);

    const data = await this.viewProfileRepository.save(newEntity);

    if (data) {
      return TOTAL_IN_DAY - (result + 1);
    }

    return TOTAL_IN_DAY - result;
  }

  async findAll(accountId: string, page: number, limit: number) {
    const totalCount = await this.viewProfileRepository.count({
      where: { profileId: accountId },
    });

    const totalPages = Math.ceil(totalCount / limit);

    const isLastPage = page >= totalPages;

    const result = await this.viewProfileRepository.find({
      where: { profileId: accountId },
      relations: ['company', 'company.companyRole'],
      skip: (page) * limit,
      take: limit
    });

    return {
      totalCount,
      totalPages,
      currentPage: page,
      isLastPage,
      data: result.map((item) => {
        return {
          id: item.company?.id,
          recruitId: item.recruitId,
          logo: item.company?.logo ? `${BUCKET_IMAGE_COMPANIES_LOGO}/${item.company?.id}/${item.company?.logo}` : null,
          profileId: item.profileId,
          company: item.company,
          companyRole: item.company?.companyRole,
          createdAt: item.createdAt,
        };
      }
      )
    };
  }
}

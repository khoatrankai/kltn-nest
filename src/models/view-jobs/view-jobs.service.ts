import { Injectable } from '@nestjs/common';
import { CreateViewJobDto } from './dto/create-view-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ViewJob } from './entities/view-job.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ViewJobsService {
  constructor(
    @InjectRepository(ViewJob)
    private viewJobRepository: Repository<ViewJob>,
  ) { }
  async create(createViewJobDto: CreateViewJobDto) {
    try {

      const checkData = await this.viewJobRepository.findOne({
        where: {
          accountId: createViewJobDto.accountId,
          postId: createViewJobDto.postId,
        },
      });

      if (!checkData) {
        const viewJob = this.viewJobRepository.create(createViewJobDto);

        return await this.viewJobRepository.save(viewJob);
      }
      return checkData;

    } catch (error) {
      throw error;
    }
  }

  async findAllService(accountId: string) {
    try {
      return await this.viewJobRepository.createQueryBuilder('viewJob')
        .leftJoinAndSelect('viewJob.post', 'post')
        .leftJoinAndSelect('post.categories', 'categories')
        .leftJoinAndSelect('categories.parentCategory', 'parentCategory')
        .leftJoinAndSelect('post.ward', 'ward')
        .leftJoinAndSelect('ward.district', 'district')
        .leftJoinAndSelect('district.province', 'province')
        .leftJoinAndSelect('post.postImages', 'postImages')
        .leftJoinAndSelect('post.jobTypeData', 'jobTypeData')
        .leftJoinAndSelect('post.companyInformation', 'companyInformation')
        .leftJoinAndSelect('companyInformation.ward', 'companyWard')
        .leftJoinAndSelect('companyWard.district', 'companyDistrict')
        .leftJoinAndSelect('companyDistrict.province', 'companyProvince')
        .leftJoinAndSelect('companyInformation.companySize', 'companySize')
        .leftJoinAndSelect('companyInformation.companyRole', 'companyRole')
        .leftJoinAndSelect('companyInformation.category', 'companyCategory')
        .leftJoinAndSelect('post.companyResource', 'companyResource')
        .leftJoinAndSelect('post.salaryTypeData', 'salaryTypeData')
        .leftJoinAndSelect('post.profile', 'profile')
        .leftJoinAndSelect('post.bookmarks', 'bookmark')
        .where('viewJob.accountId = :accountId', { accountId })
        .getMany();

    } catch (error) {
      throw error;
    }
  }
}

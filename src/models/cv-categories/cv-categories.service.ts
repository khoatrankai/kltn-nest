import { Injectable } from '@nestjs/common';
import { CreateArrayCvCategory } from './dto/array-create-cv-category';
import { DeleteCvCategoriesDto } from './dto/delete-cv-categories.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CvCategory } from './entities/cv-category.entity';
import { Repository } from 'typeorm';
import { Post } from '../post-models/posts/entities';

@Injectable()
export class CvCategoriesService {
  constructor(
    @InjectRepository(CvCategory)
    private readonly cvCategoryRepository: Repository<CvCategory>,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) { }
  async create(_createCvCategoryDto: CreateArrayCvCategory) {
    try {
      let dataCreate = {};
      const { accountId, data } = _createCvCategoryDto;
      const cvIndex = data[0].cvIndex;

      const existingRecords = await this.cvCategoryRepository.find({
        where: { accountId, cvIndex }
      });

      const existingData = existingRecords.map(item => ({
        cvIndex: item.cvIndex,
        accountId: item.accountId,
        parentCategoryId: item.parentCategoryId,
        wardId: item.wardId,
        percent: item.percent
      }));

      const newData = data.map(item => ({
        cvIndex: item.cvIndex,
        accountId,
        parentCategoryId: item.parentCategoryId,
        wardId: item.wardId,
        percent: item.percent
      }));

      const recordsToDelete = existingData.filter(
        existingItem => !newData.some(
          newItem => JSON.stringify(newItem) === JSON.stringify(existingItem)
        )
      );

      const recordsToInsert = newData.filter(
        newItem => !existingData.some(
          existingItem => JSON.stringify(newItem) === JSON.stringify(existingItem)
        )
      );

      for (const record of recordsToDelete) {
        await this.cvCategoryRepository.delete({
          accountId: record.accountId,
          cvIndex: record.cvIndex,
          parentCategoryId: record.parentCategoryId,
          wardId: record.wardId,
          percent: record.percent
        });
      }

      if (recordsToInsert.length > 0) {
        dataCreate = await this.cvCategoryRepository.save(recordsToInsert);
      }

      return dataCreate;
    } catch (error) {
      throw error;
    }
  }

  async findAll(accountId: string, cvIndex: number) {
    try {
      const allCvCategories = await this.cvCategoryRepository.find({
        where: {
          accountId: accountId,
          cvIndex: cvIndex
        }
      });

      const maxPercent = Math.max(...allCvCategories.map(category => category.percent));

      const highestPercentCategories = allCvCategories.filter(category => category.percent === maxPercent);

      const idsCategories = highestPercentCategories.map(category => category.parentCategoryId);

      const wardId = highestPercentCategories[0].wardId;

      // get post

      const dataPostOfParentCategoryAndLocation = await this.postsRepository.createQueryBuilder('post')
        .leftJoinAndSelect('post.categories', 'category')
        .leftJoinAndSelect('category.parentCategory', 'parentCategory')
        // .leftJoinAndSelect('post.ward', 'ward')
        // .leftJoinAndSelect('ward.district', 'district')
        // .leftJoinAndSelect('district.province', 'province')
        .leftJoinAndSelect('post.postImages', 'postImages')
        // .leftJoinAndSelect('post.jobTypeData', 'jobTypeData')
        .leftJoinAndSelect('post.companyInformation', 'companyInformation')
        .leftJoinAndSelect('companyInformation.ward', 'companyWard')
        .leftJoinAndSelect('companyWard.district', 'companyDistrict')
        .leftJoinAndSelect('companyDistrict.province', 'companyProvince')
        .leftJoinAndSelect('companyInformation.companySize', 'companySize')
        .leftJoinAndSelect('companyInformation.companyRole', 'companyRole')
        .leftJoinAndSelect('companyInformation.category', 'companyCategory')
        // .leftJoinAndSelect('post.companyResource', 'companyResource')
        // .leftJoinAndSelect('post.salaryTypeData', 'salaryTypeData')
        // .leftJoinAndSelect('post.profile', 'profile')
        .where('post.status = :status', { status: 1 })
        .andWhere('parentCategory.id IN (:...idsCategories)', { idsCategories })
        .andWhere('post.wardId = :wardId', { wardId })
        .getMany();


      return dataPostOfParentCategoryAndLocation;
    } catch (error) {
      throw error;
    }
  }


  async remove(_dto: DeleteCvCategoriesDto) {
    try {
      return await this.cvCategoryRepository.delete({
        accountId: _dto.accountId,
        id: _dto.cvIndex
      });
    } catch (error) {
      throw error;
    }
  }
}

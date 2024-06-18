import { Injectable } from '@nestjs/common';
import { CreateArrayCvsPost } from './dto/array-create-cvs-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CvsPost } from './entities/cvs-post.entity';
import { Repository } from 'typeorm';
import { DeleteCvsPostDto } from './dto/delete-cvs-post.dto';
import { Post } from '../post-models/posts/entities';
import { CvProject } from '../cv-models/cv-project/entities/cv-project.entity';
import { CvExtraInformation } from '../cv-models/cv-extra-information/entities/cv-extra-information.entity';

@Injectable()
export class CvsPostsService {
  constructor(
    @InjectRepository(CvsPost)
    private cvsPostRepository: Repository<CvsPost>,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(CvProject)
    private cvProjectRepository: Repository<CvProject>,
    @InjectRepository(CvExtraInformation)
    private cvExtraInformationRepository: Repository<CvExtraInformation>,
  ) { }
  async create(_createCvsPostDto: CreateArrayCvsPost) {
    try {
      let dataCreate = {};
      const { data } = _createCvsPostDto;
      if (data.length === 0) {
        return dataCreate;
      }
      const cvIndex = data[0].cvIndex;
      const type = data[0].type;
      const accountId = (data[0] as any).accountId;

      const existingRecords = await this.cvsPostRepository.find({
        where: { accountId, cvIndex, type }
      });

      const existingData = existingRecords.map(item => ({
        cvIndex: item.cvIndex,
        accountId: item.accountId,
        type: item.type,
        postId: item.postId
      }));

      const newData = data.map(item => ({
        cvIndex: item.cvIndex,
        accountId,
        type: item.type,
        postId: item.postId
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

      console.log(recordsToInsert);

      for (const record of recordsToDelete) {
        await this.cvsPostRepository.delete({
          accountId: record.accountId,
          cvIndex: record.cvIndex,
          type: record.type,
          postId: record.postId
        });
      }

      if (recordsToInsert.length > 0) {
        dataCreate = await this.cvsPostRepository.save(recordsToInsert);
      }

      return dataCreate;

    } catch (error) {
      throw error;
    }
  }

  async findAll(accountId: string, type: number, cvIndex: number, postId: number) {
    try {

      let dataPost = [];

      if (type === 0) {
        dataPost = await this.postsRepository.createQueryBuilder('post')
          .leftJoinAndSelect('post.categories', 'category')
          .leftJoinAndSelect('category.parentCategory', 'parentCategory')
          .leftJoinAndSelect('post.postImages', 'postImages')
          .leftJoinAndSelect('post.companyInformation', 'companyInformation')
          .leftJoinAndSelect('post.cvsPosts', 'cvsPosts')
          .leftJoinAndSelect('companyInformation.ward', 'companyWard')
          .leftJoinAndSelect('companyWard.district', 'companyDistrict')
          .leftJoinAndSelect('companyDistrict.province', 'companyProvince')
          .leftJoinAndSelect('companyInformation.companySize', 'companySize')
          .leftJoinAndSelect('companyInformation.companyRole', 'companyRole')
          .leftJoinAndSelect('companyInformation.category', 'companyCategory')
          .where('post.status = :status', { status: 1 })
          .andWhere('cvsPosts.cvIndex = :cvIndex', { cvIndex })
          .andWhere('cvsPosts.accountId = :accountId', { accountId })
          .andWhere('cvsPosts.type = :type', { type })
          .limit(1000)
          .getMany();
      }

      else {
        dataPost = await this.postsRepository.createQueryBuilder('post')
          .leftJoinAndSelect('post.categories', 'category')
          .leftJoinAndSelect('category.parentCategory', 'parentCategory')
          .leftJoinAndSelect('post.postImages', 'postImages')
          .leftJoinAndSelect('post.companyInformation', 'companyInformation')
          .leftJoinAndSelect('post.cvsPosts', 'cvsPosts')
          .leftJoinAndSelect('companyInformation.ward', 'companyWard')
          .leftJoinAndSelect('companyWard.district', 'companyDistrict')
          .leftJoinAndSelect('companyDistrict.province', 'companyProvince')
          .leftJoinAndSelect('companyInformation.companySize', 'companySize')
          .leftJoinAndSelect('companyInformation.companyRole', 'companyRole')
          .leftJoinAndSelect('companyInformation.category', 'companyCategory')
          .where('post.status = :status', { status: 1 })
          .andWhere('post.id = :postId', { postId })
          .andWhere('cvsPosts.type = :type', { type })
          .limit(1000)
          .getMany();
      }


      return dataPost;
    } catch (error) {
      throw error;
    }
  }

  async remove(deleteCvsPostDto: DeleteCvsPostDto) {
    try {

      const { accountId, type, cvIndex } = deleteCvsPostDto;

      const data = await this.cvsPostRepository.delete({ accountId, type, cvIndex });

      return data;
    } catch (error) {
      throw error;
    }
  }

  async findAllCvs(_accountId: string, postId: number) {
    try {
      const dataResponse: any = [];
      const data = await this.postsRepository.createQueryBuilder('post')
        .select(['post.id', 'post.title', 'post.description', 'post.createdAt', 'post.updatedAt', 'post.status'])
        .leftJoinAndSelect('post.categories', 'childCategory')
        .leftJoinAndSelect('childCategory.parentCategory', 'parentCategory')
        .leftJoinAndSelect('parentCategory.cvCategories', 'cvCategory')
        .where('post.accountId = :accountId', { accountId: _accountId })
        .andWhere('post.id = :postId', { postId })
        .getOne();


      if (data) {
        let listCvs: any = [];

        const listCategoryDistinct = data.categories.filter((item, index, self) =>
          index === self.findIndex((t) => (
            t.parentCategory.id === item.parentCategory.id
          ))
        );

        for (const category of listCategoryDistinct) {
          if (category.parentCategory && category.parentCategory.cvCategories) {
            for (const cvCategory of category.parentCategory.cvCategories) {
              const inforCvExtraInformation = await this.cvExtraInformationRepository.createQueryBuilder('cvExtraInformation')
                .leftJoinAndSelect('cvExtraInformation.moreCvExtraInformation', 'moreCvExtraInformation')
                .where('cvExtraInformation.accountId = :accountId', { accountId: cvCategory.accountId })
                .andWhere('cvExtraInformation.cvIndex = :cvIndex', { cvIndex: cvCategory.cvIndex })
                .getMany();

              const inforCvProject = await this.cvProjectRepository.createQueryBuilder('cvProject')
                .leftJoinAndSelect('cvProject.moreCvProject', 'moreCvProject')
                .where('cvProject.accountId = :accountId', { accountId: cvCategory.accountId })
                .andWhere('cvProject.cvIndex = :cvIndex', { cvIndex: cvCategory.cvIndex })
                .getMany();

              listCvs.push({
                cvIndex: cvCategory.cvIndex,
                accountId: cvCategory.accountId,
                cvExtraInformation: inforCvExtraInformation,
                cvProject: inforCvProject
              });
            }
          }
          dataResponse.push({
            postId: postId,
            cvs: listCvs
          });
        }
      }

      return {
        statusCode: 200,
        message: "Get all cvs successfully",
        data: dataResponse
      };
    } catch (error) {
      throw error;
    }
  }

  async removeCvs(postId: number) {
    try {
      return await this.cvsPostRepository.delete({ postId });
    } catch (error) {
      throw error;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParentCategory } from './entities/parent.entity';
import { Repository } from 'typeorm';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import sharp from 'sharp';
import { ChildrenService } from '../children/children.service';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { Post } from 'src/models/post-models/posts/entities';
// import { ViewJob } from 'src/models/view-jobs/entities/view-job.entity';
// import { Application } from 'src/models/application-model/applications/entities/application.entity';
// import { Bookmark } from 'src/models/bookmarks/entities/bookmark.entity';

@Injectable()
export class ParentService {


  constructor(
    @InjectRepository(ParentCategory)
    private readonly parentRepository: Repository<ParentCategory>,
    // @InjectRepository(ViewJob)
    // private readonly viewJobRepository: Repository<ViewJob>,
    // @InjectRepository(Application)
    // private readonly applicationRepository: Repository<Application>,
    // @InjectRepository(Bookmark)
    // private readonly bookmarkRepository: Repository<Bookmark>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly childrenService: ChildrenService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  findAll() {
    try {
      return this.parentRepository.find({ relations: ['childCategories'] })
    } catch (error) {
      throw new Error('Could not find')
    }
  }

  findOne(id: number) {
    try {
      return this.parentRepository.findOne({ where: { id: id }, relations: ['childCategories'] })
    } catch (error) {
      throw new Error('Could not find')
    }
  }

  remove(id: number) {
    return `This action removes a #${id} parent`;
  }

  async createParent(dto: CreateParentDto, files: { image: Express.Multer.File[], defaultPostImage: Express.Multer.File[] }) {
    try {
      const parent = new ParentCategory();
      parent.status = dto.status;
      parent.name = dto.name;
      parent.nameEn = dto.nameEn;
      parent.nameKor = dto.nameKor;

      // save with s3
      if (files.image && files.image.length > 0) {
        const imageBuffer = files.image[0].buffer;
        const resizedImageBuffer = await sharp(imageBuffer).resize(106, 105).toBuffer();
        const imageUrl = await this.cloudinaryService.uploadImageToCloud(resizedImageBuffer, files.image[0].originalname);
        parent.image = imageUrl;
      }

      if (files.defaultPostImage && files.defaultPostImage.length > 0) {
        const defaultPostImageBuffer = files.defaultPostImage[0].buffer;
        const defaultPostImageUrl = await this.cloudinaryService.uploadImageDefaultToCloud(defaultPostImageBuffer, files.defaultPostImage[0].originalname);
        parent.defaultPostImage = defaultPostImageUrl;
      }

      // Save database
      await this.parentRepository.save(parent);

      return true;
    } catch (error) {
      throw new Error('Error while creating parent');
    }
  }


  async update(idParent: number, updateParentDto: UpdateParentDto) {

    try {
      const { childCategories, ...otherVariables } = updateParentDto;

      await this.parentRepository.update({ id: idParent }, otherVariables)

      if (updateParentDto.childCategories?.[0]) {

        const { id, ...dataChild } = updateParentDto.childCategories?.[0]

        await this.childrenService.update(id, dataChild);

      }
    } catch (error) {
      throw new Error("Error while updating")
    }

  }


  async analytics(_type: string, _year: number) {
    try {
      if (_type === 'salary') {
        const salaryMilestone = [
          { min: 0, max: 1000 },
          { min: 1001, max: 2000000 },
          { min: 2000001, max: 4000000 },
          { min: 4000001, max: 6000000 },
          { min: 6000001, max: 8000000 },
          { min: 8000001, max: 10000000 },
        ];

        const resultWithMinMax = [];

        for (let i = 0; i < salaryMilestone.length; i++) {
          const milestone = salaryMilestone[i];

          const query = this.parentRepository.createQueryBuilder('parent_categories')
            .leftJoinAndSelect('parent_categories.childCategories', 'childCategories')
            .leftJoinAndSelect('childCategories.posts', 'posts')
            .select([
              'parent_categories.id',
              'parent_categories.name',
              'COUNT(posts.id) AS total_post'
            ])
            .where(`posts.salaryMin >= ${milestone.min} AND posts.salaryMax <= ${milestone.max}`)
            .addGroupBy('parent_categories.id')
            .addGroupBy('parent_categories.name')
            .orderBy('total_post', 'DESC');

          const result = await query.getRawMany();

          resultWithMinMax.push({
            min: milestone.min,
            max: milestone.max,
            data: result
          });
        }

        for (let i = 0; i < resultWithMinMax.length; i++) {
          let allPost = 0;
          let percent = 0;
          let totalPercentTop5 = 0;
          let totalPostTop5 = 0;

          resultWithMinMax[i].data.forEach((item: any) => {
            allPost += +item.total_post;
          });

          (resultWithMinMax[i] as any).total_posts = allPost;

          resultWithMinMax[i].data.forEach((item: any) => {
            percent = (item.total_post / allPost) * 100;
            item.percent = percent;
          });

          resultWithMinMax[i].data = resultWithMinMax[i].data.slice(0, 5);

          resultWithMinMax[i].data.forEach((item: any) => {
            totalPercentTop5 += item.percent;
            totalPostTop5 += +item.total_post;
          });

          (resultWithMinMax[i] as any).totalPercentTop5 = totalPercentTop5;
          (resultWithMinMax[i] as any).totalPostTop5 = totalPostTop5;

          resultWithMinMax[i].data.push({
            parent_categories_id: 0,
            parent_categories_name: 'Others',
            total_post: allPost - (resultWithMinMax[i] as any).totalPostTop5,
            percent: 100 - totalPercentTop5
          });
        }

        return {
          resultWithMinMax
        };
      }
      else if (_type === 'application') {
        let totalApplication = 0;
        let totalPercentTop5 = 0;
        let resultTotal = []

        const queryApplication = this.parentRepository.createQueryBuilder('parent_categories')
          .leftJoinAndSelect('parent_categories.childCategories', 'childCategories')
          .leftJoinAndSelect('childCategories.posts', 'posts')
          .leftJoinAndSelect('posts.applications', 'applications')
          .select([
            'parent_categories.id',
            'parent_categories.name',
            'COUNT(applications.id) AS total_application'
          ])
          .groupBy('parent_categories.id')
          .orderBy('total_application', 'DESC')

        const result = await queryApplication.getRawMany();

        result.forEach((item: any) => {
          totalApplication += +item.total_application;
        });

        result.forEach((item: any) => {
          item.percent = (item.total_application / totalApplication) * 100;
        });


        const resultTop5 = result.slice(0, 5);
        resultTop5.forEach((item: any) => {
          totalPercentTop5 += item.percent;
        });

        // return 5 top and others
        resultTop5.push({
          parent_categories_id: 0,
          parent_categories_name: 'Others',
          total_application: totalApplication - resultTop5[0].total_application,
          percent: 100 - totalPercentTop5
        });

        const querySalaryMax = this.postRepository.createQueryBuilder('posts')
          .select('MAX(posts.salaryMax)', 'max')
          .getRawOne();

        const queryTotalPost = this.postRepository.createQueryBuilder('posts')
          .select('COUNT(posts.id)', 'total_post')
          .getRawOne();

        const queryTotalParentCategory = this.parentRepository.createQueryBuilder('parent_categories')
          .select('COUNT(parent_categories.id)', 'total_parent_category')
          .getRawOne();


        resultTotal.push({
          salaryMax: (await querySalaryMax).max > 1000000 ? Math.round((await querySalaryMax).max / 1000000) + 'M' : (await querySalaryMax).max + 'K',
          totalPost: (await queryTotalPost).total_post,
          totalParentCategory: (await queryTotalParentCategory).total_parent_category,
        })
        return {
          resultTop5,
          resultTotal
        };
      }
      else {
        return [];
      }

    } catch (error) {
      throw error;
    }
  }
}

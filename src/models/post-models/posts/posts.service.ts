import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities';
import { HotTopicQueriesDto } from './dto/hot-topic-queries.dto';
import {
  PostsQueryBuilder,
  countByHotTopicQuery,
  findByHotTopicQuery,
} from './repository';
import { CreatePostByAdminDto } from './dto/admin-create-post.dto';
import { BUCKET_IMAGE_POST_UPLOAD } from 'src/common/constants';
import { PostsImagesService } from '../posts-images/posts-images.service';
import { CreatePostsImageDto } from '../posts-images/dto/create-posts-image.dto';
import { PostImages } from '../posts-images/entities/post-images.entity';
import { PostsCategoriesService } from '../posts-categories/posts-categories.service';
import { CreatePostCategoriesDto } from '../posts-categories/dto/create-posts-categories.dto';
import { PostCategories } from '../posts-categories/entities/posts-categories.entity';
import { CreatePostResourceDto } from '../post-resource/dto/create-post-resource.dto';
import { PostResourceService } from '../post-resource/post-resource.service';
import { NewestPostQueriesDto } from './dto/newest-queries.dto';
import generateQuery from './helper/generateQuery.hotopic';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { CompaniesService } from 'src/models/company-models/companies/companies.service';
import { User } from 'src/models/user-model/users/entities';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly postImagesService: PostsImagesService,
    private readonly postCategoriesService: PostsCategoriesService,
    private readonly postResourceService: PostResourceService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly companiesService: CompaniesService,
  ) { }

  async findByAccountId(accountId: string): Promise<Post[]> {
    return (
      this.postsRepository
        .createQueryBuilder('posts')
        .where('posts.accountId = :accountId', { accountId })
        .select([
          'posts.id',
          'posts.title',
          'posts.createdAt',
          'posts.updatedAt',
        ])
        .orderBy('posts.createdAt', 'DESC')
        // .take(3)
        .skip(0)
        .limit(3)
        .getMany()
    );
  }

  /**
   *
   * @param id
   * @param limit
   * @param page
   * @returns
   *
   * @description: find posts by hot topic id
   *
   * @example:
   * 1: Influencer
   * 2: Remote job
   * 3: Short time job
   * 4: Today job
   * 5: Freelance job
   * 6: Delivery, Driver
   *
   */

  async findByHotTopicId(
    id: number,
    limit: number,
    page: number,
    provinceId?: string,
  ): Promise<any> {
    // generate query and call function
    let query: HotTopicQueriesDto = generateQuery(id, provinceId);

    return findByHotTopicQuery(this.postsRepository, query, page, limit);
  }

  async findByQuery(
    query: HotTopicQueriesDto,
    limit: number,
    page: number,
  ): Promise<any> {
    return findByHotTopicQuery(this.postsRepository, query, page, limit);
  }

  async countByQuery(query: HotTopicQueriesDto): Promise<number> {
    return countByHotTopicQuery(this.postsRepository, query);
  }

  async countByHotTopicId(id: number): Promise<number> {
    // generate query and call function
    let query: HotTopicQueriesDto = generateQuery(id);

    return countByHotTopicQuery(this.postsRepository, query);
  }

  async findOne(id: number): Promise<Post | null> {
    return this.postsRepository.findOne({
      relations: [
        'categories',
        'categories.parentCategory',
        'ward',
        'ward.district',
        'ward.district.province',
        'postImages',
        'jobTypeData',
        'companyInformation',
        'companyInformation.ward',
        'companyInformation.ward.district',
        'companyInformation.ward.district.province',
        'companyInformation.companySize',
        'companyInformation.companyRole',
        'companyInformation.category',
        'companyResource',
        'salaryTypeData',
        'profile',
      ],
      where: {
        id,
        // status: 1,
        // applications: {

        // }
      },
    });
  }

  async create(dto: CreatePostByAdminDto): Promise<Post> {
    try {
      const post = this.postsRepository.create(dto.toEntity());
      const data = await this.postsRepository.save(post);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   *
   * @param postId
   * @param images
   * @returns
   * @description: save post images to aws s3 and save to database
   */
  async savePostImages(
    postId: number,
    images: Express.Multer.File[],
  ): Promise<PostImages[] | []> {
    const resultUploadImages = await this.cloudinaryService.uploadImages(
      images,
      { BUCKET: BUCKET_IMAGE_POST_UPLOAD, id: postId },
    );
    const postImageDto: CreatePostsImageDto[] = resultUploadImages.map(
      (image: any) => {
        return new CreatePostsImageDto(postId, image, 0);
      },
    );
    postImageDto[0].type = 1; // set thumbnail
    const postImages = this.postImagesService.createPostImages(postImageDto);
    return postImages;
  }

  /**
   *
   * @param postId
   * @param categories
   * @returns
   * @description: save post categories to database
   */
  async savePostCategories(
    postId: number,
    categories: number[],
  ): Promise<PostCategories[]> {
    const dto: CreatePostCategoriesDto[] = categories.map((categoryId) => {
      return new CreatePostCategoriesDto(postId, categoryId);
    });
    const postCategories =
      await this.postCategoriesService.createPostCategories(dto);
    return postCategories;
  }

  /**
   * @param id: post id
   * @param url: url of resource
   * @param companyId: company id
   * @returns
   * @description: save post resource to database
   */
  async savePostResource(
    id: number,
    url: string,
    companyId: number,
  ): Promise<any> {
    const dto = new CreatePostResourceDto(id, url, companyId);
    const postResource = await this.postResourceService.create(dto);
    return postResource;
  }

  async deleteById(id: number): Promise<any> {
    return this.postsRepository.delete(id);
  }

  async getNewestPosts(
    limit: number,
    page: number,
    queries?: NewestPostQueriesDto,
    threshold?: number,
  ): Promise<any[]> {
    return new PostsQueryBuilder(this.postsRepository).getNewestPosts(
      page,
      limit,
      queries,
      threshold,
    ) as any;
  }

  async getHotPostsService(limit: number, page: number) {
    try {
      // get all acountId 
      let data = [] as any;
      let totalPage = 0;
      const dataIds = await this.userRepository.createQueryBuilder('accounts')
        .select('accounts.id')
        .leftJoinAndSelect('accounts.serviceHistories', 'serviceHistories')
        .where('DATE_ADD(serviceHistories.created_at, INTERVAL serviceHistories.service_expiration DAY) > NOW()')
        .getMany();

      const ids = dataIds.map((item) => item.id);

      if (ids.length > 0) {
        const count = await this.postsRepository.createQueryBuilder('posts')
          .where(`posts.accountId IN (:...ids)`, {
            ids,
          })
          .getCount();

        totalPage = Math.ceil(count / limit);

        data = await this.postsRepository.createQueryBuilder('posts')
          .innerJoinAndSelect('posts.categories', 'categories')
          .innerJoinAndSelect('categories.parentCategory', 'parentCategory')
          .innerJoinAndSelect('posts.ward', 'ward')
          .innerJoinAndSelect('ward.district', 'district')
          .innerJoinAndSelect('district.province', 'province')
          .leftJoinAndSelect('posts.postImages', 'postImages')
          .innerJoinAndSelect('posts.jobTypeData', 'jobTypeData')
          .innerJoinAndSelect('posts.salaryTypeData', 'salaryTypeData')
          .innerJoinAndSelect('posts.companyResource', 'companyResource')
          .where(`posts.accountId IN (:...ids)`, {
            ids,
          })
          .limit(limit)
          .offset((page - 1) * limit)
          .getMany();
      }

      else {
        const count = await this.postsRepository.createQueryBuilder('posts')
          .getCount();

        totalPage = Math.ceil(count / limit);

        data = await this.postsRepository.createQueryBuilder('posts')
          .innerJoinAndSelect('posts.categories', 'categories')
          .innerJoinAndSelect('categories.parentCategory', 'parentCategory')
          .innerJoinAndSelect('posts.ward', 'ward')
          .innerJoinAndSelect('ward.district', 'district')
          .innerJoinAndSelect('district.province', 'province')
          .leftJoinAndSelect('posts.postImages', 'postImages')
          .innerJoinAndSelect('posts.jobTypeData', 'jobTypeData')
          .innerJoinAndSelect('posts.salaryTypeData', 'salaryTypeData')
          .innerJoinAndSelect('posts.companyResource', 'companyResource')
          .limit(limit)
          .offset((page - 1) * limit)
          .orderBy('posts.createdAt', 'DESC')
          .getMany();
      }

      return { currentPage: page, totalPage, posts: data };
    } catch (error) {
      throw error;
    }
  }

  async getPostByKeyword(keyword: string, limit: number, page: number) {
    return this.postsRepository
      .createQueryBuilder('posts')
      .where('posts.title LIKE :keyword', { keyword: `%${keyword}%` })
      .select([
        'posts.id',
        'posts.title',
      ])
      .orderBy('posts.createdAt', 'DESC')
      .skip(page * limit)
      .take(limit)
      .getMany();
  }

  async findAccountPostOfMonths(accountId: string) {
    try {
      const result = await this.postsRepository
        .createQueryBuilder('posts')
        .select([
          'COUNT(posts.id) as total',
          'DATE_FORMAT(posts.createdAt, "%d-%m") as month',
        ])
        .where('posts.accountId = :accountId', { accountId })
        .groupBy('month')
        .orderBy('month', 'ASC')
        .getRawMany();

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getPostForCompanyService(
    companyId: number,
    limit: number,
    page: number,
  ) {
    try {

      const accountIdCompany = await this.companiesService.getCompanyByAccountId(
        +companyId,
      );

      if (!accountIdCompany) {
        throw new BadRequestException('Company not found');
      }

      // count

      const total = await this.postsRepository.count({
        where: {
          accountId: accountIdCompany.accountId,
        },
      });

      const data = await this.postsRepository.createQueryBuilder('posts')
        .where('posts.accountId = :accountIdCompany', {
          accountIdCompany: accountIdCompany.accountId,
        })
        .orderBy('posts.createdAt', 'DESC')
        .skip(page * limit)
        .take(limit)
        .getMany();

      return {
        total,
        data,
        is_over:
          data.length === total ? true : data.length < limit ? true : false,
      }
    } catch (error) {
      throw error;
    }
  }


  async getPostByGpsService(
    page: number = 1,
    limit: number = 10,
    lat: number,
    long: number,
    minRadius: number = 0,
    maxRadius: number = 100,
  ) {
    try {
      const R = 6371;
      const maxDistance = maxRadius;
      const minLat = lat - (maxDistance / R) * (180 / Math.PI);
      const maxLat = lat + (maxDistance / R) * (180 / Math.PI);
      const minLong = long - (maxDistance / (R * Math.cos((Math.PI * lat) / 180))) * (180 / Math.PI);
      const maxLong = long + (maxDistance / (R * Math.cos((Math.PI * lat) / 180))) * (180 / Math.PI);

      // Count total posts within the bounding box
      const countQuery = await this.postsRepository
        .createQueryBuilder('posts')
        .where('posts.latitude BETWEEN :minLat AND :maxLat', { minLat, maxLat })
        .andWhere('posts.longitude BETWEEN :minLong AND :maxLong', { minLong, maxLong })
        .getCount();

      const totalCount = countQuery;

      const potentialPosts = await this.postsRepository
        .createQueryBuilder('posts')
        .innerJoinAndSelect('posts.categories', 'categories')
        .innerJoinAndSelect('categories.parentCategory', 'parentCategory')
        .innerJoinAndSelect('posts.ward', 'ward')
        .innerJoinAndSelect('ward.district', 'district')
        .innerJoinAndSelect('district.province', 'province')
        .leftJoinAndSelect('posts.postImages', 'postImages')
        .innerJoinAndSelect('posts.jobTypeData', 'jobTypeData')
        .innerJoinAndSelect('posts.salaryTypeData', 'salaryTypeData')
        .innerJoinAndSelect('posts.companyResource', 'companyResource')
        .where('posts.latitude BETWEEN :minLat AND :maxLat', { minLat, maxLat })
        .andWhere('posts.longitude BETWEEN :minLong AND :maxLong', { minLong, maxLong })
        .orderBy('posts.createdAt', 'DESC')
        .skip((page - 1) * limit)
        .take(limit)
        .getMany();

      const filteredPosts = [];
      for (const post of potentialPosts) {
        const distance = await this.calculateDistance(lat, long, post.latitude, post.longitude);
        if (distance >= minRadius && distance <= maxRadius) {
          filteredPosts.push(post);
        }
      }

      let additionalPostsNeeded = limit - filteredPosts.length;
      let nextPage = page + 1;

      while (additionalPostsNeeded > 0 && nextPage <= Math.ceil(totalCount / limit)) {
        const morePotentialPosts = await this.postsRepository
          .createQueryBuilder('posts')
          .innerJoinAndSelect('posts.categories', 'categories')
          .innerJoinAndSelect('categories.parentCategory', 'parentCategory')
          .innerJoinAndSelect('posts.ward', 'ward')
          .innerJoinAndSelect('ward.district', 'district')
          .innerJoinAndSelect('district.province', 'province')
          .leftJoinAndSelect('posts.postImages', 'postImages')
          .innerJoinAndSelect('posts.jobTypeData', 'jobTypeData')
          .innerJoinAndSelect('posts.salaryTypeData', 'salaryTypeData')
          .innerJoinAndSelect('posts.companyResource', 'companyResource')
          .where('posts.latitude BETWEEN :minLat AND :maxLat', { minLat, maxLat })
          .andWhere('posts.longitude BETWEEN :minLong AND :maxLong', { minLong, maxLong })
          .orderBy('posts.createdAt', 'DESC')
          .skip((nextPage - 1) * limit)
          .take(limit)
          .getMany();

        for (const post of morePotentialPosts) {
          const distance = await this.calculateDistance(lat, long, post.latitude, post.longitude);
          if (distance >= minRadius && distance <= maxRadius) {
            filteredPosts.push(post);
            additionalPostsNeeded--;
            if (additionalPostsNeeded === 0) {
              break;
            }
          }
        }

        nextPage++;
      }

      // Return paginated result
      const startIndex = (page - 1) * limit;
      const paginatedPosts = filteredPosts.slice(startIndex, startIndex + limit);

      return { currentPage: page, totalPage: Math.ceil(totalCount / limit), posts: paginatedPosts };
    } catch (error) {
      throw error;
    }
  }
  
  private async calculateDistance(lat1: number, long1: number, lat2: number, long2: number): Promise<number> {
    const accessToken = 'pk.eyJ1IjoiaGJ0b2FuIiwiYSI6ImNsd29tc2h2NjFhOTEyaW54MmFnYWt3ZDQifQ.ljik1w_nZErIaDyhwXh68w';
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${long1},${lat1};${long2},${lat2}?access_token=${accessToken}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.routes && data.routes.length > 0) {
      const distanceInMeters = data.routes[0].distance;
      const distanceInKm = distanceInMeters / 1000;
      return distanceInKm;
    }

    throw new Error('Unable to calculate distance');
  }
}

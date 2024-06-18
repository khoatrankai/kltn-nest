import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserService } from 'src/models/user-model/users/users.service';
import { ProfilesCvsService } from '../profiles-cvs/profiles_cvs.service';
import { Application } from 'src/models/application-model/applications/entities/application.entity';
import { Bookmark } from 'src/models/bookmarks/entities/bookmark.entity';
import { Post } from 'src/models/post-models/posts/entities';
import { FollowCompany } from 'src/models/company-models/follow-companies/entities/follow-company.entity';
import { ViewProfile } from 'src/models/view_profiles/entities/view_profile.entity';
import { KeywordNotification } from 'src/models/keyword-models/keyword-notifications/entities/keyword-notification.entity';
import { CompanyRating } from 'src/models/company-models/company-ratings/entities/company-rating.entity';
import { ViewJob } from 'src/models/view-jobs/entities/view-job.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(FollowCompany)
    private readonly followCompanyRepository: Repository<FollowCompany>,
    @InjectRepository(ViewProfile)
    private readonly viewProfileRepository: Repository<ViewProfile>,
    @InjectRepository(KeywordNotification)
    private readonly keywordNotificationRepository: Repository<KeywordNotification>,
    @InjectRepository(CompanyRating)
    private readonly companyRatingRepository: Repository<CompanyRating>,
    @InjectRepository(ViewJob)
    private readonly viewJobRepository: Repository<ViewJob>,
    private readonly userService: UserService,
    private readonly profilesCvsService: ProfilesCvsService
  ) { }

  create(_createProfileDto: CreateProfileDto) {
    return 'This action adds a new profile';
  }

  findAll() {
    return `This action returns all profiles`;
  }

  async findOne(id: string) {
    let result = await this.profileRepository.findOne({
      relations: [
        'user',
        'province',
        'profilesLocations',
        'profilesLocations.province',
        'childCategories',
        'childCategories.parentCategory',
        'profilesExperiences',
        'profilesEducations',
        'profilesAward',
        // 'profilesCourse',
        // 'profilesHobby',
        // 'profilesActivity',
        // 'profilesIntership',
        // 'profilesReference',
        'profilesSkill',
        'profilesSkill.levelType',
        'profileLanguage',
        'profileLanguage.levelTypeLanguage',
        'profilesEducations.academicType',
        'profilesCv',
        'jobType',
        'company',
        'company.companyRole',
        'company.companySize',
        'company.ward',
        'company.ward.district',
        'company.ward.district.province',
        'company.category',
        'company.companyImages',
      ],
      where: { accountId: id },
      relationLoadStrategy: 'join',
    });
    return result;
  }

  getProfileEmail(id: string) {
    return this.profileRepository.findOne({
      select: ['email'],
      where: { accountId: id },
    });
  }

  async getProfileById(id: string, accountId: string, unlock: string) {
    try {
      const checkRecruit = await this.userService.findByIdAndType(accountId);

      if (!checkRecruit) {
        throw new BadRequestException('Is not a recruiter');
      }

      const profile = await this.profileRepository
        .createQueryBuilder('profile')
        .leftJoinAndSelect('profile.user', 'user')
        .leftJoinAndSelect('profile.province', 'province')
        .leftJoinAndSelect('profile.profilesLocations', 'profilesLocations')
        .leftJoinAndSelect(
          'profilesLocations.province',
          'profilesLocations_province',
        )
        .leftJoinAndSelect('profile.childCategories', 'childCategories')
        .leftJoinAndSelect(
          'childCategories.parentCategory',
          'childCategories_parentCategory',
        )
        .leftJoinAndSelect('profile.profilesExperiences', 'profilesExperiences')
        .leftJoinAndSelect('profile.profilesEducations', 'profilesEducations')
        .leftJoinAndSelect('profile.profilesAward', 'profilesAward')
        .leftJoinAndSelect('profile.profilesCourse', 'profilesCourse')
        .leftJoinAndSelect('profile.profilesHobby', 'profilesHobby')
        .leftJoinAndSelect('profile.profilesActivity', 'profilesActivity')
        .leftJoinAndSelect('profile.profilesIntership', 'profilesIntership')
        .leftJoinAndSelect('profile.profilesReference', 'profilesReference')
        .leftJoinAndSelect('profile.profilesSkill', 'profilesSkill')
        .leftJoinAndSelect('profilesSkill.levelType', 'profilesSkill_levelType')
        .leftJoinAndSelect('profile.profileLanguage', 'profileLanguage')
        .leftJoinAndSelect(
          'profileLanguage.levelTypeLanguage',
          'profileLanguage_levelTypeLanguage',
        )
        .leftJoinAndSelect('profile.profilesCv', 'profilesCv')
        .leftJoinAndSelect('profile.jobType', 'jobType')
        .leftJoinAndSelect(
          'profile.candidateBookmarked',
          'candidateBookmarked',
          'candidateBookmarked.recruitId = :recruitId',
          { recruitId: accountId },
        )
        .where('profile.accountId = :id', { id })
        .getOne();

      return {
        data: profile,
        unlock,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(updateProfileDto: UpdateProfileDto) {
    try {
      const profile = await this.profileRepository.findOne({
        where: { accountId: updateProfileDto.accountId },
      });

      if (!profile) {
        throw new Error('Profile not found');
      }

      await this.profilesCvsService.updateStatusPublic(
        updateProfileDto.accountId,
        updateProfileDto.cvIds,
      );

      const updatedProfile = Object.assign(profile, updateProfileDto);

      await this.profileRepository.save(updatedProfile);
    } catch (error) {
      throw error;
    }
  }

  async updatePoint(id: string, point: number) {
    try {
      let checkData = await this.profileRepository.findOne({
        where: { accountId: id },
      });

      await this.profileRepository.update(
        { accountId: id },
        { point: (checkData ? checkData.point : 0) + point },
      );
    } catch (error) {
      throw error;
    }
  }

  async getAnalytics(accountId: string) {
    try {
      let childCategoryOfProfile = [] as any;
      let districtOfProfile = [] as any;

      const profileQuery = this.profileRepository.createQueryBuilder('profiles')
        .leftJoinAndSelect('profiles.profilesLocations', 'profilesLocations')
        .leftJoinAndSelect('profiles.childCategories', 'childCategories')
        .where('profiles.accountId = :accountId', { accountId })

      const profile = await profileQuery.getOne();

      if (profile) {
        childCategoryOfProfile = profile.childCategories.map((childCategory) => childCategory.id);
        districtOfProfile = profile.profilesLocations.map((location) => location.id);
      }

      const queryCountApplication = this.applicationRepository.createQueryBuilder('applications')
        .where('applications.accountId = :accountId', { accountId })

      const totalApplication = await queryCountApplication.getCount();

      const queryCountBookmark = this.bookmarkRepository.createQueryBuilder('bookmarks')
        .where('bookmarks.accountId = :accountId', { accountId })

      const totalBookmark = await queryCountBookmark.getCount();

      const queryCountPost = this.postRepository.createQueryBuilder('posts')
        .leftJoinAndSelect('posts.categories', 'categories')
        .where('posts.status = :status', { status: 1 })
        .andWhere('posts.wardId IN (:...districtOfProfile)', { districtOfProfile })
        .orWhere('categories.id IN (:...childCategoryOfProfile)', { childCategoryOfProfile })

      const totalPost = await queryCountPost.getCount();

      const queryFollowCompany = this.followCompanyRepository.createQueryBuilder('followCompany')
        .where('followCompany.accountId = :accountId', { accountId })

      const totalFollowCompany = await queryFollowCompany.getCount();

      const queryViewProfile = this.viewProfileRepository.createQueryBuilder('viewProfile')
        .where('viewProfile.profileId = :accountId', { accountId })

      const totalViewProfile = await queryViewProfile.getCount();

      const queryCountKeywordNotification = this.keywordNotificationRepository.createQueryBuilder('keywords_notification')
        .where('keywords_notification.accoundId = :accountId', { accountId })

      const totalKeywordNotification = await queryCountKeywordNotification.getCount();

      return {
        totalApplication,
        totalBookmark,
        totalPost,
        totalFollowCompany,
        totalViewProfile,
        totalKeywordNotification,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getRecruiterPostedProfiles(_accountId: string) {
    try {
      const countPostById = await this.postRepository.count({
        where: { accountId: _accountId },
      });

      const totalApplicationQuery = this.applicationRepository.createQueryBuilder('applications')
        .leftJoinAndSelect('applications.post', 'post')
        .where('post.accountId = :accountId', { accountId: _accountId });

      const totalApplication = await totalApplicationQuery.getCount();

      const totalReviewCompanyQuery = this.companyRatingRepository.createQueryBuilder('company_ratings')
        .leftJoinAndSelect('company_ratings.company', 'company')
        .where('company.accountId = :accountId', { accountId: _accountId });

      const totalReviewCompany = await totalReviewCompanyQuery.getCount();

      const analyticViewJobQuery = await this.viewJobRepository.createQueryBuilder('view_jobs')
        .leftJoinAndSelect('view_jobs.post', 'post')
        .where('post.accountId = :accountId', { accountId: _accountId })
        .select([
          'post.id',
          'post.title',
          'COUNT(view_jobs.id) AS views',
          'SUM(MONTH(view_jobs.createdAt) = MONTH(NOW())) AS currentMonthViews',
          'SUM(MONTH(view_jobs.createdAt) = MONTH(NOW() - INTERVAL 1 MONTH)) AS previousMonthViews',
          `CASE 
            WHEN SUM(MONTH(view_jobs.createdAt) = MONTH(NOW())) > SUM(MONTH(view_jobs.createdAt) = MONTH(NOW() - INTERVAL 1 MONTH)) THEN 'up'
            WHEN SUM(MONTH(view_jobs.createdAt) = MONTH(NOW())) < SUM(MONTH(view_jobs.createdAt) = MONTH(NOW() - INTERVAL 1 MONTH)) THEN 'down'
            ELSE 'unchanged'
            END AS status`
        ])
        .groupBy('post.id')
        .getRawMany();

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();

      const analyticsData = Array.from({ length: 12 }, (_, i) => ({ month: i + 1, total: 0 }));

      const countAnalyticsPosted12Month = await this.postRepository
        .createQueryBuilder('posts')
        .leftJoinAndSelect('posts.viewJobs', 'viewJobs')
        .where('posts.accountId = :accountId', { accountId: _accountId })
        .andWhere('YEAR(viewJobs.createdAt) = :year', { year: currentYear })
        // .andWhere('posts.createdAt >= DATE_SUB(NOW(), INTERVAL 12 MONTH)')
        .select([
          'MONTH(posts.createdAt) AS month',
          'COUNT(posts.id) AS total'
        ])
        .groupBy('MONTH(posts.createdAt)')
        .getRawMany();

      analyticsData.forEach((item, index) => {
        const findData = countAnalyticsPosted12Month.find((data) => data.month === index + 1);
        if (findData) {
          item.total = +findData.total;
        }
      });

      return {
        totalPost: countPostById,
        totalApplication,
        totalReviewCompany,
        analyticViewJobQuery,
        countAnalyticsPosted12Month: analyticsData
      }
    } catch (error) {
      throw error;
    }
  }

  async getRecruiterViewdProfilesByMonth(_accountId: string, _month: string, _page: number, _limit: number) {
    try {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = +_month;

      const skip = (_page) * _limit;

      const totalPosts = await this.postRepository.createQueryBuilder('posts')
        .where('posts.accountId = :accountId', { accountId: _accountId })
        .andWhere('YEAR(posts.createdAt) = :year', { year: currentYear })
        .andWhere('MONTH(posts.createdAt) = :month', { month: currentMonth })
        .getCount();

      const getViewForMonth = await this.postRepository.createQueryBuilder('posts')
        .where('posts.accountId = :accountId', { accountId: _accountId })
        .leftJoinAndSelect('posts.viewJobs', 'viewJobs')
        .leftJoinAndSelect('posts.categories', 'categories')
        .leftJoinAndSelect('posts.ward', 'ward')
        .leftJoinAndSelect('ward.district', 'district')
        .leftJoinAndSelect('district.province', 'province')
        .leftJoinAndSelect('posts.postImages', 'postImages')
        .leftJoinAndSelect('posts.jobTypeData', 'jobTypeData')
        .andWhere('YEAR(viewJobs.createdAt) = :year', { year: currentYear })
        .andWhere('MONTH(viewJobs.createdAt) = :month', { month: currentMonth })
        .skip(skip)
        .take(_limit)
        .getMany();

      const currentPage = Math.ceil((skip + 1) / _limit);

      return {
        total: totalPosts,
        totalPage: Math.ceil(totalPosts / _limit),
        currentPage: currentPage,
        data: getViewForMonth
      };
    } catch (error) {
      throw error;
    }
  }

  async getRecruiterApplicationsFullMonth(_accountId: string) {
    try {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();

      const analyticsData = Array.from({ length: 12 }, (_, i) => ({ month: i + 1, seen: 0, accepted: 0, rejected: 0 }));

      const applicationsQuery = await this.postRepository.createQueryBuilder('posts')
        .leftJoin('posts.applications', 'applications')
        .andWhere('YEAR(applications.createdAt) = :year', { year: currentYear })
        .andWhere('posts.accountId = :accountId', { accountId: _accountId })
        .select([
          'MONTH(applications.createdAt) AS month',
          'SUM(CASE WHEN applications.status = 1 THEN 1 ELSE 0 END) AS seen',
          'SUM(CASE WHEN applications.status = 2 THEN 1 ELSE 0 END) AS accepted',
          'SUM(CASE WHEN applications.status = 3 THEN 1 ELSE 0 END) AS rejected'
        ])
        .groupBy('MONTH(applications.createdAt)')
        .getRawMany();


      analyticsData.forEach((item, index) => {
        const findData = applicationsQuery.find((data) => data.month === index + 1);
        if (findData) {
          item.seen = +findData.seen;
          item.accepted = +findData.accepted;
          item.rejected = +findData.rejected;
        }
      })

      return analyticsData;
    } catch (error) {
      throw error;
    }
  }

  async getRecruiterApplicationsByMonth(_accountId: string, _month: string, _page: number, _limit: number) {
    try {

      const countApplications = await this.applicationRepository.createQueryBuilder('applications')
        .leftJoin('applications.post', 'post')
        .where('post.accountId = :accountId', { accountId: _accountId })
        .andWhere('MONTH(applications.createdAt) = :month', { month: _month })
        .getCount();

      const applicationsQuery = await this.postRepository.createQueryBuilder('posts')
        .leftJoin('posts.applications', 'applications')
        .leftJoin('posts.categories', 'categories')
        .leftJoin('posts.ward', 'ward')
        .leftJoin('ward.district', 'district')
        .leftJoin('district.province', 'province')
        .leftJoin('posts.postImages', 'postImages')
        .leftJoin('posts.jobTypeData', 'jobTypeData')
        .where('posts.accountId = :accountId', { accountId: _accountId })
        .andWhere('MONTH(applications.createdAt) = :month', { month: _month })
        .select([
          'posts.id AS postId',
          'posts.title',
          'COUNT(CASE WHEN applications.status = 1 THEN 1 ELSE NULL END) AS seen',
          'COUNT(CASE WHEN applications.status = 2 THEN 1 ELSE NULL END) AS accepted',
          'COUNT(CASE WHEN applications.status = 3 THEN 1 ELSE NULL END) AS rejected'
        ])
        .groupBy('posts.id')
        .skip(_page * _limit)
        .take(_limit)
        .getRawMany();


      return {
        total: countApplications,
        currentPage: _page,
        totalPage: Math.ceil(countApplications / _limit) - 1,
        month: _month,
        data: applicationsQuery
      };

    } catch (error) {
      throw error;
    }
  }

  async getRecruiterPercents(_accountId: string) {

    try {
      const totalCompanyRating = await this.companyRatingRepository.createQueryBuilder('company_ratings')
        .leftJoin('company_ratings.company', 'company')
        .where('company.accountId = :accountId', { accountId: _accountId })
        .getCount();

      const totalCompanyRaingStarBiggerThan3 = await this.companyRatingRepository.createQueryBuilder('company_ratings')
        .leftJoin('company_ratings.company', 'company')
        .where('company.accountId = :accountId', { accountId: _accountId })
        .andWhere('company_ratings.star > 3')
        .getCount();

      const totalViewPost = await this.viewJobRepository.createQueryBuilder('view_jobs')
        .leftJoin('view_jobs.post', 'post')
        .where('post.accountId = :accountId', { accountId: _accountId })
        .getCount();

      const totalApplicationOfView = await this.applicationRepository.createQueryBuilder('applications')
        .leftJoin('applications.post', 'post')
        .leftJoin('post.viewJobs', 'viewJobs')
        .where('post.accountId = :accountId', { accountId: _accountId })
        .getCount();

      const totalApplication = await this.applicationRepository.createQueryBuilder('applications')
        .leftJoin('applications.post', 'post')
        .where('post.accountId = :accountId', { accountId: _accountId })
        .getCount();

      const totalApplicationStatusIsTwo = await this.applicationRepository.createQueryBuilder('applications')
        .leftJoin('applications.post', 'post')
        .where('post.accountId = :accountId', { accountId: _accountId })
        .andWhere('applications.status = 2')
        .getCount();

      const totalPost = await this.postRepository.createQueryBuilder('posts')
        .where('posts.accountId = :accountId', { accountId: _accountId })
        .getCount();

      const totalBookmark = await this.bookmarkRepository.createQueryBuilder('bookmarks')
        .leftJoin('bookmarks.post', 'post')
        .where('post.accountId = :accountId', { accountId: _accountId })
        .groupBy('post.id')
        .getCount();

      return {
        percentCompanyRatings: {
          totalCompanyRating,
          totalCompanyRaingStarBiggerThan3,
          percent: totalCompanyRating > 0 ? (totalCompanyRaingStarBiggerThan3 / totalCompanyRating) * 100 : 0
        },
        percentViewPostAndApply: {
          totalViewPost,
          totalApplicationOfView,
          percent: totalViewPost > 0 ? (totalApplicationOfView / totalViewPost) * 100 : 0
        },
        percentApplication: {
          totalApplication,
          totalApplicationStatusIsTwo,
          percent: totalApplication > 0 ? (totalApplicationStatusIsTwo / totalApplication) * 100 : 0
        },
        percentPostAndBookmark: {
          totalPost,
          totalBookmark,
          percent: totalPost > 0 ? (totalBookmark / totalPost) * 100 : 0
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async getRecruiterPercentsApp(_accountId: string, year: number) {
    try {

      const totalPostOfYear = await this.postRepository.createQueryBuilder('posts')
        .where('posts.accountId = :accountId', { accountId: _accountId })
        .andWhere('YEAR(posts.createdAt) = :year', { year })
        .getCount();

      const totalPostsOfMonth = await this.postRepository.createQueryBuilder('posts')
        .where('posts.accountId = :accountId', { accountId: _accountId })
        .andWhere('YEAR(posts.createdAt) = :year', { year })
        .select([
          'MONTH(posts.createdAt) AS month',
          'COUNT(posts.id) AS total'
        ])
        .groupBy('MONTH(posts.createdAt)')
        .orderBy('month')
        .getRawMany();

      const postsMap = new Map(totalPostsOfMonth.map(item => [item.month, item.total]));

      const postsArray = [...postsMap];

      const result = postsArray.map(([month, value]) => {
        return {
          month: month,
          total: value,
          percent: totalPostOfYear > 0 ? (value / totalPostOfYear) * 100 : 0
        };
      });


      return {
        totalPostOfYear,
        result
      };
    } catch (error) {
      throw error;
    }
  }
}

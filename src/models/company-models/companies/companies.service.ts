import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Not, Repository } from 'typeorm';
import { CreateCompanyImageDto } from '../company-images/dto/create-company-image.dto';
import { CompanyImagesService } from '../company-images/company-images.service';
import { CompanyImage } from '../company-images/entities/company-image.entity';
import { FollowCompany } from '../follow-companies/entities/follow-company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(FollowCompany)
    private readonly followCompanyRepository: Repository<FollowCompany>,
    private readonly companyImagesService: CompanyImagesService,
  ) { }

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = this.companyRepository.create(createCompanyDto);
    return await this.companyRepository.save(company);
  }

  async createCompanyImage(
    createCompanyImagesDto: CreateCompanyImageDto[],
  ): Promise<CompanyImage[]> {
    const companyImages = await this.companyImagesService.create(
      createCompanyImagesDto,
    );
    return companyImages;
  }

  async removeCompanyImages(id: number[], companyId: number): Promise<any> {
    const deletedImages = await Promise.all(
      id.map(async (imageId) => {
        return await this.companyImagesService.remove(+imageId, companyId);
      }),
    );

    return deletedImages.filter(
      (image) =>
        image?.affected === undefined ||
        image?.affected === null ||
        image?.affected > 0,
    );
  }

  findOne(id: number, _accountId: string) {
    return this.companyRepository.findOne({
      relations: ['companyImages'],
      where: {
        id,
        accountId: _accountId,
      },
    });
  }

  findByAccountId(_accountId: string) {
    return this.companyRepository.findOne({
      relations: [
        'ward',
        'ward.district',
        'ward.district.province',
        'companyRole',
        'companySize',
      ],
      where: {
        accountId: _accountId,
      },
    });
  }

  update(id: number, _updateCompanyDto: UpdateCompanyDto) {
    return this.companyRepository.update({ id }, _updateCompanyDto).then(() => {
      return this.companyRepository.findOne({ where: { id } });
    });
  }

  remove(id: number, _accountId: string) {
    return this.companyRepository.delete({ id, accountId: _accountId });
  }

  async getCompany(page: number, limit: number) {
    try {
      const total = await this.companyRepository.count();

      const data = await this.companyRepository.find({
        relations: ['companyImages', 'posts', 'profile'],
        order: {
          id: 'DESC',
        },
        where: {
          // status !== 3
          status: Not(3),
        },
        take: limit,
        skip: page * limit,
      });

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

  async getDetailCompany(id: number) {
    try {
      const countFollowCompany = await this.followCompanyRepository.count({
        where: {
          companyId: id,
        },
      });

      const data = await this.companyRepository.findOne({
        where: {
          id,
        },
        relations: [
          'companyImages',
          'companyRole',
          'companySize',
          'ward',
          'category',
          'followCompanies',
          'category'
        ],
      });

      return {
        ...data,
        countFollowCompany,
      };
    } catch (error) {
      throw error;
    }
  }

  async getDetailCompanyByNameMobile(name: string) {
    try {
      const data = await this.companyRepository.findOne({
        where: {
          name,
        },
        relations: [
          'companyImages',
          'companyRole',
          'companySize',
          'ward',
          'category',
          'followCompanies',
          'category'
        ],
      });

      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateLogo(id: number, logo: string) {
    const company = await this.companyRepository.findOne({ where: { id } });

    if (!company) throw new Error('Company not found');

    company.logo = logo;

    return this.companyRepository.save(company);
  }

  async searchCompanyService(address: any, page: number, limit: number, categories: any, companySizeId: any) {
    try {
      let addressArr, categoriesArr;

      if (address) {
        addressArr = Array.isArray(address) ? address : [address];
      }

      if (categories) {
        categoriesArr = Array.isArray(categories) ? categories.map(c => +c) : [+categories];
      }

      const query = this.companyRepository.createQueryBuilder('company');
      query.leftJoinAndSelect('company.companyImages', 'companyImages');
      query.leftJoinAndSelect('company.category', 'category');
      query.leftJoinAndSelect('company.companyRole', 'companyRole');
      query.leftJoinAndSelect('company.companySize', 'companySize');
      query.leftJoinAndSelect('company.ward', 'ward');
      query.leftJoinAndSelect('ward.district', 'district');

      if (addressArr && Array.isArray(addressArr) && addressArr.length > 0) {
        query.andWhere('district.id IN (:...address)', { address: addressArr.map(a => a) });
      }

      if (categoriesArr && Array.isArray(categoriesArr) && categoriesArr.length > 0) {
        query.andWhere('category.id IN (:...categories)', { categories: categoriesArr.map(c => c) });
      }

      if (companySizeId) {
        query.andWhere('companySize.id = :companySizeId', { companySizeId: +companySizeId });
      }

      const total = await query.getCount();

      const data = await query
        .take(+limit)
        .skip(page * +limit)
        .getMany();

      return {
        total,
        data,
        is_over: data.length === total ? true : data.length < limit ? true : false,
      };
    } catch (error) {
      throw error;
    }
  }

  async getCompanyByAccountId(companyId: number) {
    return this.companyRepository.findOne({
      where: {
        id: companyId,
      },
      select: ['id', 'accountId'],
    });
  }

  async updateStatusActiveService(id: number, status: number) {
    try {
      const company = await this.companyRepository.findOne({ where: { id } });

      if (!company) throw new Error('Company not found');

      company.isActive = status;

      return this.companyRepository.save(company);
    } catch (error) {
      throw error;
    }
  }

  async findAllPostService(companyId: number, accountId?: string) {
    try {
      const query = this.companyRepository.createQueryBuilder('companies');
      query.leftJoinAndSelect('companies.posts', 'posts');
      query.leftJoinAndSelect('posts.categories', 'categories');
      query.leftJoinAndSelect('categories.parentCategory', 'parentCategory');
      query.leftJoinAndSelect('posts.ward', 'ward');
      query.leftJoinAndSelect('ward.district', 'district');
      query.leftJoinAndSelect('district.province', 'province');
      query.leftJoinAndSelect('posts.postImages', 'postImages');
      query.leftJoinAndSelect('posts.jobTypeData', 'jobType');
      query.leftJoinAndSelect('posts.companyInformation', 'companyInformation');
      query.leftJoinAndSelect('companyInformation.ward', 'companyWard');
      query.leftJoinAndSelect('companyWard.district', 'companyDistrict');
      query.leftJoinAndSelect('companyDistrict.province', 'companyProvince');
      query.leftJoinAndSelect('companyInformation.companySize', 'companySize');
      query.leftJoinAndSelect('companyInformation.companyRole', 'companyRole');
      query.leftJoinAndSelect('companyInformation.category', 'companyCategory');
      query.leftJoinAndSelect('posts.companyResource', 'companyResource');
      query.leftJoinAndSelect('posts.salaryTypeData', 'salaryType');
      query.leftJoinAndSelect('posts.profile', 'profile');
      if (accountId) {
        query.leftJoinAndSelect('posts.bookmarks', 'bookmarks');
        query.andWhere('bookmarks.accountId = :accountId', { accountId });
      }
      query.where('companies.id = :companyId', { companyId })
      query.orderBy('posts.createdAt', 'DESC');


      return await query.getOne();

    } catch (error) {
      throw error;
    }
  }
}

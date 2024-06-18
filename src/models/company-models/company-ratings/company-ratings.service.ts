import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyRatingDto } from './dto/create-company-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyRating } from './entities/company-rating.entity';

@Injectable()
export class CompanyRatingsService {
  constructor(
    @InjectRepository(CompanyRating)
    private readonly companyRatingRepository: Repository<CompanyRating>,
  ) {}
  async create(createCompanyRatingDto: CreateCompanyRatingDto) {
    try {
      const checkCompanyRating = await this.companyRatingRepository.findOne({
        where: {
          accountId: createCompanyRatingDto.accountId,
          companyId: createCompanyRatingDto.companyId,
        },
      });

      if (checkCompanyRating) {
        // update
      
        await this.companyRatingRepository.update(
          {
            accountId: createCompanyRatingDto.accountId,
            companyId: createCompanyRatingDto.companyId,
          },
          createCompanyRatingDto,
        );

        return {
          statusCode: HttpStatus.OK,
          data: checkCompanyRating,
        };
      }

      const newCompanyRating = this.companyRatingRepository.create(
        createCompanyRatingDto,
      );

      const data = await this.companyRatingRepository.save(newCompanyRating);

      return {
        statusCode: HttpStatus.CREATED,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number, limit: number, page: number) {
    try {
      const total = await this.companyRatingRepository.count({
        where: {
          companyId: id
        }
      })

      const totalStarOfRatin = await this.companyRatingRepository.find({
        where: {
          companyId: id,
        },
        select: ['star'],
      });

      const totalStar = totalStarOfRatin.reduce((acc, cur) => {
        return acc + +cur.star;
      }, 0);

      const averageRated = Math.round(totalStar / total);

      const data = await this.companyRatingRepository.find({
        where: {
          companyId: id,
        },
        relations: ['account', 'account.profile'],
        take: limit,
        skip: limit * page,
      });

      return {
        total,
        totalStar: averageRated,
        data,
        isOver: data.length === total ? true : data.length < limit ? true : false,
      };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number, accountId: string) {
    try {
      // delete

      const checkCompanyRating = await this.companyRatingRepository.findOne({
        where: {
          id,
          accountId,
        },
      });

      if (!checkCompanyRating) {
        throw new BadRequestException('Company rating not found');
      }

      await this.companyRatingRepository.delete({
        id,
        accountId,
      });
    } catch (error) {
      throw error;
    }
  }

  async findOneByAccountId(id: number, accountId: string) {
    try {
      return await this.companyRatingRepository.findOne({
        where: {
          companyId: id,
          accountId,
        },
      });

    } catch (error) {
      throw error;
    }
  }
}

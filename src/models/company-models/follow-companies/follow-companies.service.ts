import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateFollowCompanyDto } from './dto/create-follow-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowCompany } from './entities/follow-company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FollowCompaniesService {
  constructor(
    @InjectRepository(FollowCompany)
    private followCompanyRepository: Repository<FollowCompany>
  ) { }
  async create(createFollowCompanyDto: CreateFollowCompanyDto) {
    try {

      const checkData = await this.followCompanyRepository.findOne({
        where: {
          accountId: createFollowCompanyDto.accountId,
          companyId: createFollowCompanyDto.companyId
        }
      });

      if (checkData) {
        await this.followCompanyRepository.delete(checkData.id);

        return {
          statusCode: HttpStatus.OK,
          message: 'Unfollow company successfully'
        }
      }

      const newFollowCompany = this.followCompanyRepository.create(createFollowCompanyDto);

      await this.followCompanyRepository.save(newFollowCompany);

      return {
        statusCode: HttpStatus.OK,
        message: 'Follow company successfully'
      }
    } catch (error) {
      throw error;
    }
  }

  async findAll(accountId : string) {
    try {
      return await this.followCompanyRepository.find({
        relations: ['company'],
        where: {
          accountId
        }
      });
    } catch (error) {
      throw error;
    }
  }
}

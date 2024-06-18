import { Injectable } from '@nestjs/common';
import { CreateCompanySizeDto } from './dto/create-company-size.dto';
import { UpdateCompanySizeDto } from './dto/update-company-size.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanySize } from './entities/company-size.entity';

@Injectable()
export class CompanySizesService {

  constructor(
    @InjectRepository(CompanySize)
    private readonly companySizeRepository: Repository<CompanySize>,
  ) {}

  create(_createCompanySizeDto: CreateCompanySizeDto) {
    return 'This action adds a new companySize';
  }

  findAll() {
    return this.companySizeRepository.find({
      where: {
        status: 1
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} companySize`;
  }

  update(id: number, _updateCompanySizeDto: UpdateCompanySizeDto) {
    return `This action updates a #${id} companySize`;
  }

  remove(id: number) {
    return `This action removes a #${id} companySize`;
  }
}

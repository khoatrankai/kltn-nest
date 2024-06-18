import { Injectable } from '@nestjs/common';
import { CreateCompanyImageDto } from './dto/create-company-image.dto';
import { UpdateCompanyImageDto } from './dto/update-company-image.dto';
import { CompanyImage } from './entities/company-image.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompanyImagesService {

  constructor(
    @InjectRepository(CompanyImage)
    private readonly companyImageRepository: Repository<CompanyImage>,
  ) { }

  create(_createCompanyImageDto: CreateCompanyImageDto[]) {
    const companyImage = this.companyImageRepository.create(_createCompanyImageDto);
    return this.companyImageRepository.save(companyImage);
  }

  findAll() {
    return `This action returns all companyImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyImage`;
  }

  update(id: number, _updateCompanyImageDto: UpdateCompanyImageDto) {
    return `This action updates a #${id} companyImage`;
  }

  remove(id: number, companyId: number) {
    return this.companyImageRepository.delete({ id, companyId });

  }
}

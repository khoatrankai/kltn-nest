import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CvTemplate } from './entities/cv-template.entity';
// import { CreateCvTempmplateDto } from './dto/create-cv-template.dto';
// import { UpdateCvTelateDto } from './dto/update-cv-template.dto';

@Injectable()
export class CvTemplateService {

  constructor(
    @InjectRepository(CvTemplate)
    private readonly cvTemplateRepository: Repository<CvTemplate>,
  ) {}

  // create(_createCvTemplateDto: CreateCvTemplateDto) {
  //   return 'This action adds a new cvTemplate';
  // }

  findAll(parentCategoryId?: number) {
    return this.cvTemplateRepository.find(
      {
        where: {
          parentCategoryId: parentCategoryId,
          status: 1
        }
      }
    );
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} cvTemplate`;
  // }

  // update(id: number, _updateCvTemplateDto: UpdateCvTemplateDto) {
  //   return `This action updates a #${id} cvTemplate`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} cvTemplate`;
  // }
}

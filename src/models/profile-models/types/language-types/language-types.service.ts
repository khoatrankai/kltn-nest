import { Injectable } from '@nestjs/common';
import { CreateLanguageTypeDto } from './dto/create-language-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LanguageType } from './entities/language-type.entity';

@Injectable()
export class LanguageTypesService {
  constructor(
    @InjectRepository(LanguageType)
    private readonly languageTypeRepository: Repository<LanguageType>,
  ) {}
  async create(createLanguageTypeDto: CreateLanguageTypeDto) {
    try {
      
      const languageTypeEntity = this.languageTypeRepository.create(
        createLanguageTypeDto,
      );
  
      return await this.languageTypeRepository.save(languageTypeEntity);

    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.languageTypeRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.languageTypeRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { CreateAcademicTypeDto } from './dto/create-academic_type.dto';
import { UpdateAcademicTypeDto } from './dto/update-academic_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademicType } from './entities/academic_type.entity';

@Injectable()
export class AcademicTypesService {
  constructor(
    @InjectRepository(AcademicType)
    private readonly academicTypeRepository: Repository<AcademicType>,
  ) {}
  async create(createAcademicTypeDto: CreateAcademicTypeDto) {
    try {
      const academicType = this.academicTypeRepository.create(
        createAcademicTypeDto,
      );

      return await this.academicTypeRepository.save(academicType);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.academicTypeRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async update(updateAcademicTypeDto: UpdateAcademicTypeDto) {
    try {
      return await this.academicTypeRepository.update(
        updateAcademicTypeDto.id,
        updateAcademicTypeDto,
      );
    } catch (error) {
      throw error;
    }
  }
}

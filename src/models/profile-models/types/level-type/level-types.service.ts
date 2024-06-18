import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LevelType } from './entities/level-types.entity';
import { CreateLevelTypeDto } from './dto/create-level-type.dto';

@Injectable()
export class LevelTypeService {
  constructor(
    @InjectRepository(LevelType)
    private readonly levelTypeRepository: Repository<LevelType>,
  ) {}
  async create(createLevelTypeDto: CreateLevelTypeDto) {
    try {
      
      const profileSkillRoleEntity = this.levelTypeRepository.create(
        createLevelTypeDto,
      );
  
      return await this.levelTypeRepository.save(profileSkillRoleEntity);

    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.levelTypeRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.levelTypeRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}

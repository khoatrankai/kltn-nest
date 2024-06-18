import { Injectable } from '@nestjs/common';
import { CreateMoreCvProjectDto } from './dto/create-more-cv-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoreCvProject } from './entities/more-cv-project.entity';

@Injectable()
export class MoreCvProjectService {
  constructor(
    @InjectRepository(MoreCvProject)
    private readonly moreCvProjectRepository: Repository<MoreCvProject>,
  ) {}
  async create(createMoreCvProjectDto: CreateMoreCvProjectDto) {
    try {
      const checkData = await this.moreCvProjectRepository.findOne({
        where: {
          cvProjectId: createMoreCvProjectDto.cvProjectId,
        },
      });

      if (checkData) {
        await this.moreCvProjectRepository.delete({
          cvProjectId: createMoreCvProjectDto.cvProjectId,
        });
      }

      const newMoreCvProject = this.moreCvProjectRepository.create(
        createMoreCvProjectDto,
      );

      await this.moreCvProjectRepository.save(newMoreCvProject);
    } catch (error) {
      throw error;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CvProject } from './entities/cv-project.entity';
import { Repository } from 'typeorm';
import { ArrayCreateCvProjectDto } from './dto/array-create-cv-project.dto';
import { CreateCvProjectTransaction } from './transaction/create-cv-project.transaction';
import { MoreCvProject } from '../more-cv-project/entities/more-cv-project.entity';

@Injectable()
export class CvProjectService {
  constructor(
    @InjectRepository(CvProject)
    private readonly cvProjectRepository: Repository<CvProject>,
    @InjectRepository(MoreCvProject)
    private readonly moreCvProjectRepository: Repository<MoreCvProject>,
    private readonly createCvProjectTransaction: CreateCvProjectTransaction,
  ) {}
  async create(createCvProjectDto: ArrayCreateCvProjectDto) {
    try {
      return await this.createCvProjectTransaction.run(createCvProjectDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(accountId: string, cvIndex: number) {
    try {
      return await this.cvProjectRepository.find({
        where: {
          accountId,
          cvIndex,
        },
        relations: ['moreCvProject'],
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteCvProject(accountId: string, cvIndex: number) {
    try {
      const check = await this.cvProjectRepository.find({
        where: { accountId: accountId, cvIndex: cvIndex },
      });

      if (check) {
        let data = 0;
        check.forEach(async (element) => {
          const res = await this.moreCvProjectRepository.delete({
            cvProjectId: element.id,
          });

          if (res) {
            data = data + 1;
          }
        });

        await this.cvProjectRepository.delete({
          accountId: accountId,
          cvIndex: cvIndex,
        });

        return data;
      }

      return 0;
    } catch (error) {
      throw error;
    }
  }
}

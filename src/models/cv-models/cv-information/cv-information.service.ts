import { Injectable } from '@nestjs/common';
import { CreateCvInformationDto } from './dto/create-cv-information.dto';
import { CreateCvInformationTransaction } from './transactions/create-cv-information.transaction';
import { InjectRepository } from '@nestjs/typeorm';
import { CvInformation } from './entities/cv-information.entity';
import { Repository } from 'typeorm';
import { MoreCvInformation } from '../more-cv-information/entities/more-cv-information.entity';
import { parseCommonInformation, parseEducation, parseExperience, parseProjects, parseSkills } from './utils/parseDataFromWord';
@Injectable()
export class CvInformationService {
  constructor(
    @InjectRepository(CvInformation)
    private cvInformationRepository: Repository<CvInformation>,
    @InjectRepository(MoreCvInformation)
    private moreCvInformationRepository: Repository<MoreCvInformation>,
    private createCvInformationTransaction: CreateCvInformationTransaction,
  ) { }
  async create(createCvInformationDto: CreateCvInformationDto) {
    try {
      return await this.createCvInformationTransaction.run(
        createCvInformationDto,
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll(accountId: string, cvIndex: number) {
    try {
      return await this.cvInformationRepository.findOne({
        where: { accountId: accountId, cvIndex: cvIndex },
        relations: ['moreCvInformation'],
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteCvInformation(accountId: string, cvIndex: number) {
    try {
      const check = await this.cvInformationRepository.find({
        where: { accountId: accountId, cvIndex: cvIndex },
      })

      if (check.length > 0) {
        let data = 0;
        check.forEach(async (element) => {
          const res = await this.moreCvInformationRepository.delete({
            cvInformationId: element.id,
          });

          if (res) {
            data = data + 1;
          }
        });

        await this.cvInformationRepository.delete({
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

  async readWordFileFromBuffer(result: any) {
    const projects = parseProjects(result.value);
    const skills = parseSkills(result.value);
    const experiences = parseExperience(result.value);
    const educations = parseEducation(result.value);
    const information = parseCommonInformation(result.value);

    return {
      projects,
      skills,
      experiences,
      educations,
      information,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { ArrayCreateCvExtraInformationDto } from './dto/array-create-extra-information';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CvExtraInformation } from './entities/cv-extra-information.entity';
import { CreateCvExtraInformationTransaction } from './transaction/create-cv-extra-information.transaction';
import { MoreCvExtraInformation } from '../more-cv-extra-information/entities/more-cv-extra-information.entity';

@Injectable()
export class CvExtraInformationService {
  constructor(
    @InjectRepository(CvExtraInformation)
    private readonly cvExtraInformationRepository: Repository<CvExtraInformation>,
    @InjectRepository(MoreCvExtraInformation)
    private readonly moreCvExtraInformationRepository: Repository<MoreCvExtraInformation>,
    private readonly createCvExtraInformationTransaction: CreateCvExtraInformationTransaction,
  ) {}
  async create(createCvExtraInformationDto: ArrayCreateCvExtraInformationDto) {
    try {
      return await this.createCvExtraInformationTransaction.run(
        createCvExtraInformationDto,
      );
    } catch (error) {
      throw error;
    }
  }
  async findAll(accountId: string, cvIndex: number) {
    try {
      return await this.cvExtraInformationRepository.find({
        where: {
          accountId,
          cvIndex,
        },
        relations: ['moreCvExtraInformation'],
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteMoreCvExtraInformation(accountId: string, cvIndex: number) {
    try {
      const check = await this.cvExtraInformationRepository.find({
        where: { accountId: accountId, cvIndex: cvIndex },
      });

      if (check) {
        let data = 0;
        check.forEach(async (element) => {
          const res = await this.moreCvExtraInformationRepository.delete({
            cvExtraInformationId: element.id,
          });

          if (res) {
            data = data + 1;
          }
        });

        await this.cvExtraInformationRepository.delete({
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

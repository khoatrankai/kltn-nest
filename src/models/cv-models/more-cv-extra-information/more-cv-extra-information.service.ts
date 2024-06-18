import { Injectable } from '@nestjs/common';
import { CreateMoreCvExtraInformationDto } from './dto/create-more-cv-extra-information.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreCvExtraInformation } from './entities/more-cv-extra-information.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoreCvExtraInformationService {
  constructor(
    @InjectRepository(MoreCvExtraInformation)
    private readonly moreCvExtraInformationRepository: Repository<MoreCvExtraInformation>,
  ) {}
  async create(createMoreCvExtraInformationDto: CreateMoreCvExtraInformationDto) {
    try {
      const checkData = await this.moreCvExtraInformationRepository.findOne({
        where: {
          cvExtraInformationId: createMoreCvExtraInformationDto.cvExtraInformationId,  
        }
      })

      if (checkData) {
        await this.moreCvExtraInformationRepository.delete({
          cvExtraInformationId: createMoreCvExtraInformationDto.cvExtraInformationId,
        })
      }

      const newMoreCvExtraInformation = this.moreCvExtraInformationRepository.create(createMoreCvExtraInformationDto);

      await this.moreCvExtraInformationRepository.save(newMoreCvExtraInformation);

    } catch (error) {
      throw error;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoreCvInformation } from './entities/more-cv-information.entity';
import { ArrayCreateMoreCvInformationDto } from './dto/array-more-cv-information.dto';

@Injectable()
export class MoreCvInformationService {
  constructor(
    @InjectRepository(MoreCvInformation)
    private moreCvInformationRepository: Repository<MoreCvInformation>,
  ) {}
  async create(createMoreCvInformationDto: ArrayCreateMoreCvInformationDto) {
    try {
      const checkData = await this.moreCvInformationRepository.find({
        where: { cvInformationId: createMoreCvInformationDto.data[0].cvInformationId },
      });

      if (checkData.length > 0) {
        await this.moreCvInformationRepository.delete({
          cvInformationId: createMoreCvInformationDto.data[0].cvInformationId,
        });
      }

      const dataUpload = createMoreCvInformationDto.data.map((item: any) => {
        return {
          ...item,
          cvInformationId: createMoreCvInformationDto.data[0].cvInformationId,
        };
      });

      const moreCvInformation = this.moreCvInformationRepository.create(
        dataUpload,
      );


      moreCvInformation.forEach((moreCvInformation) => {
        moreCvInformation.cvInformationId =
          createMoreCvInformationDto.data[0].cvInformationId;
        moreCvInformation.content = moreCvInformation.content;
      });

      const dataSave = await this.moreCvInformationRepository.save(
        moreCvInformation,
      );

      return dataSave;
    } catch (error) {
      throw error;
    }
  }
}

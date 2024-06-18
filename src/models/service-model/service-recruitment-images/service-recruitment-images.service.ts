import { Injectable } from '@nestjs/common';
import { CreateServiceRecruitmentImageDto } from './dto/create-service-recruitment-image.dto';
import { UpdateServiceRecruitmentImageDto } from './dto/update-service-recruitment-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceRecruitmentImage } from './entities/service-recruitment-image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceRecruitmentImagesService {
  constructor(
    @InjectRepository(ServiceRecruitmentImage)
    private serviceRecruitmentImageRepository: Repository<ServiceRecruitmentImage>
  ) { }
  async create(_createServiceRecruitmentImageDto: CreateServiceRecruitmentImageDto) {
    try {
      const newServiceRecruitmentImage = new ServiceRecruitmentImage();

      newServiceRecruitmentImage.serviceRecruitmentId = _createServiceRecruitmentImageDto.serviceRecruitmentId;
      newServiceRecruitmentImage.image = _createServiceRecruitmentImageDto.image;
      newServiceRecruitmentImage.status = _createServiceRecruitmentImageDto.status;

      const newEntity = this.serviceRecruitmentImageRepository.create(newServiceRecruitmentImage);

      return await this.serviceRecruitmentImageRepository.save(newEntity);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all serviceRecruitmentImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceRecruitmentImage`;
  }

  update(id: number, _updateServiceRecruitmentImageDto: UpdateServiceRecruitmentImageDto) {
    return `This action updates a #${id} serviceRecruitmentImage`;
  }

  async remove(ids: []) {
    try {
      if (ids && ids.length > 0) {
        return await this.serviceRecruitmentImageRepository.delete(ids);
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

  async deleteByServiceId(serviceRecruitmentId: number) {
    try {
      return await this.serviceRecruitmentImageRepository.delete({ serviceRecruitmentId });
    } catch (error) {
      throw error;
    }
  }
}

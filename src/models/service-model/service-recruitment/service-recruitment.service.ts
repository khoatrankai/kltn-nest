import { Injectable } from '@nestjs/common';
import { CreateServiceRecruitmentDto } from './dto/create-service-recruitment.dto';
import { UpdateServiceRecruitmentDto } from './dto/update-service-recruitment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceRecruitment } from './entities/service-recruitment.entity';
import { CreateServiceRecruitmentTransaction } from './transactions/create-service-recruitment.transaction';
import { UpdateServiceRecruitmentTransaction } from './transactions/update-service-recruitment.transactions';
import { ServiceRecruitmentImagesService } from '../service-recruitment-images/service-recruitment-images.service';

@Injectable()
export class ServiceRecruitmentService {
  constructor(
    @InjectRepository(ServiceRecruitment)
    private readonly serviceRecruitmentRepository: Repository<ServiceRecruitment>,
    private readonly createServiceRecruitmentTransaction : CreateServiceRecruitmentTransaction,
    private readonly updateServiceRecruitmentTransaction : UpdateServiceRecruitmentTransaction,
    private readonly serviceRecruitmentImagesService: ServiceRecruitmentImagesService
  ) {}
  async create(createServiceRecruitmentDto: CreateServiceRecruitmentDto) {
    try {
      return await this.createServiceRecruitmentTransaction.run(createServiceRecruitmentDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.serviceRecruitmentRepository.find({
        order: {
          id: 'DESC'
        },
        relations: ['serviceRecruitmentImages']
      }
    );
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.serviceRecruitmentRepository.findOne({
        where: {
          id
        },
        relations: ['serviceRecruitmentImages']
      });
    } catch (error) {
      throw error;
    }
  }

  async update(updateServiceRecruitmentDto: UpdateServiceRecruitmentDto) {
    try {
      return await this.updateServiceRecruitmentTransaction.run(updateServiceRecruitmentDto);
    } catch (error) {
      throw error;
    }
  }

  async updateStatus(id: number, status: number) {
    try {
      await this.serviceRecruitmentRepository.update(id, {
        status
      });

      return {
        message: 'Service recruitment status updated successfully'
      }
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.serviceRecruitmentImagesService.deleteByServiceId(id);

      await this.serviceRecruitmentRepository.delete(id);

      return {
        message: 'Service recruitment deleted successfully'
      }
    } catch (error) {
      throw error;
    }
  }
}

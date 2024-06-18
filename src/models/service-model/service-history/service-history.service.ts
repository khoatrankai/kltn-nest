import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateServiceHistoryDto } from './dto/create-service-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceHistory } from './entities/service-history.entity';
import { Repository } from 'typeorm';
import { Profile } from 'src/models/profile-models/profiles/entities';
import { ServiceRecruitment } from '../service-recruitment/entities/service-recruitment.entity';

@Injectable()
export class ServiceHistoryService {
  constructor(
    @InjectRepository(ServiceHistory)
    private serviceHistoryRepository: Repository<ServiceHistory>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(ServiceRecruitment)
    private serviceRecruitmentRepository: Repository<ServiceRecruitment>,
  ) { }
  async create(createServiceHistoryDto: CreateServiceHistoryDto) {
    const { serviceRecruitmentId, accountId } = createServiceHistoryDto;

    const existingServiceHistory = await this.serviceHistoryRepository.findOne({
      where: { serviceRecruitmentId, accountId },
    });

    const profile = await this.profileRepository.findOne({
      where: { accountId },
      select: ['point'],
    });

    const userPoints = profile?.point || 0;

    const serviceRecruitment = await this.serviceRecruitmentRepository.findOne({
      where: { id: serviceRecruitmentId },
    });

    if (!serviceRecruitment) {
      return {
        status: 404,
        message: 'Service not found',
      }
    }

    const priceOfService = serviceRecruitment.price * (1 - serviceRecruitment.discount / 100);

    if (userPoints < priceOfService) {
      return {
        status: 404,
        message: 'Not enough points',
      };
    }

    if (existingServiceHistory) {
      const serviceExpirationDate = new Date(existingServiceHistory.createdAt).getTime() + existingServiceHistory.serviceExpiration * 24 * 60 * 60 * 1000;

      if (Date.now() < serviceExpirationDate) {
        return {
          status: 404,
          message: 'Service is still active',
        };
      }

      await this.serviceHistoryRepository.delete(existingServiceHistory.id);
    }

    const serviceHistoryData = {
      serviceRecruitmentId,
      accountId,
      serviceName: serviceRecruitment.name,
      serviceDescription: serviceRecruitment.description,
      servicePrice: priceOfService,
      serviceType: serviceRecruitment.type,
      serviceExpiration: serviceRecruitment.expiration,
    };

    await this.serviceHistoryRepository.save(serviceHistoryData);

    await this.profileRepository.update(
      { accountId },
      { point: userPoints - priceOfService },
    );

    return { status: 200, message: existingServiceHistory ? 'Extend success' : 'Buy success' };
  }


  async findAll(accountId: string) {
    try {
      return await this.serviceHistoryRepository.find({
        where: { accountId },
        order: { createdAt: 'DESC' }
      });

    } catch (error) {
      throw error;
    }
  }

  async delete(accountId: string, id: number) {
    try {
      const result = await this.serviceHistoryRepository.delete({ accountId, id });

      if (result.affected === 0) {
        throw new BadRequestException('Service history not found');
      }

    } catch (error) {
      throw error;
    }
  }

  async findOneAndCheckStillActive(accountId: string) {
    try {
      let typeIsActive : any = [];
      const dataService = await this.serviceHistoryRepository.find({
        where: { accountId },
        order: { createdAt: 'DESC' }
      });

      if (dataService.length === 0) {
        return [];
      }

      dataService.forEach(async (service) => {
        const expirationDate = new Date(service.createdAt);
        expirationDate.setDate(expirationDate.getDate() + service.serviceExpiration);

        const isActive = expirationDate > new Date();

        if (isActive) {
          // check same item
          if (typeIsActive.length === 0) {
            typeIsActive.push(service.serviceType);
          } else {
            const isExist = typeIsActive.find((type : any) => type === service.serviceType);
            if (!isExist) {
              typeIsActive.push(service.serviceType);
            }
          }
        }
      });

      return typeIsActive;
    } catch (error) {
      throw error;
    }
  }
}

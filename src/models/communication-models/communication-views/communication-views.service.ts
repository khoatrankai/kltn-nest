import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommunicationViewDto } from './dto/create-communication-view.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunicationView } from './entities/communication-view.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommunicationViewsService {
  constructor(
    @InjectRepository(CommunicationView)
    private readonly communicationViewRepository:Repository<CommunicationView>
  ){}
  async create(createCommunicationViewDto: CreateCommunicationViewDto) {
      const newCommunicationView = this.communicationViewRepository.create(
        createCommunicationViewDto,
      );
      // get by communicationId and accountId 
      // if exists and createdAt is less than 3 hours ago, return
      // else create
      const existing = await this.communicationViewRepository.findOne({
        where: {
          communicationId: createCommunicationViewDto.communicationId,
          accountId: createCommunicationViewDto.accountId,
        },
      });
      if (existing) {
        if (existing.createdAt < new Date(Date.now() - 3 * 60 * 60 * 1000)) {
          return;
        }
      }

      return await this.communicationViewRepository.save(newCommunicationView);
  }

  async findOne(id: number) {
    return await this.communicationViewRepository.find({
      where: {
        communicationId: id,
      },
      relations: ['profile']
    });
  }
  async countCommunicationViews(id: number) {
    try {
      const likeCount = await this.communicationViewRepository.count({
        where: {
          communicationId: id,
        },
      });
      return likeCount;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error counting communication likes');
    }
  }
}

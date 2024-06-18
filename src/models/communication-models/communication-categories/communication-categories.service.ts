import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunicationCategory } from './entities/communication.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateCommunicationCategoriesDto } from './dto/create-communication-categories.dto';

@Injectable()
export class CommunicationCategoriesService {
  constructor(
    @InjectRepository(CommunicationCategory)
    private readonly globalEntityManager: EntityManager,
    @InjectRepository(CommunicationCategory)
    private readonly communicationCategoriesRepository: Repository<CommunicationCategory>
  ) {}

  async createMany(
    createCommunicationCategoriesDto: CreateCommunicationCategoriesDto[],
    transactionalManager?: EntityManager,
  ) {
    const manager = transactionalManager ?? this.globalEntityManager;

    return await manager
      .getRepository(CommunicationCategory)
      .save(createCommunicationCategoriesDto);
  }

  async delete(communicationId: number, transactionalManager?: EntityManager) {
    const manager = transactionalManager ?? this.globalEntityManager;
    await manager
      .getRepository(CommunicationCategory)
      .delete({ communicationId });
  }

  async findAll() {
    return this.communicationCategoriesRepository.find({
      relations: ['parentCategory']
    })
  }
}

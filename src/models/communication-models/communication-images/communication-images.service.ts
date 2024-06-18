import { Injectable } from '@nestjs/common';
import { CreateCommunicationImageDto } from './dto/create-communication-image.dto';
import { UpdateCommunicationImageDto } from './dto/update-communication-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunicationImage } from './entities/communication-image.entity';
import { EntityManager, In, Repository } from 'typeorm';

@Injectable()
export class CommunicationImagesService {
  constructor(
    @InjectRepository(CommunicationImage)
    private readonly communicationImageRepository: Repository<CommunicationImage>,
    private readonly globalEntityManager: EntityManager,
  ) {}

  async createMany(
    createCommunicationImageDto: CreateCommunicationImageDto[],
    transactionalManager?: EntityManager,
  ) {
    const manager = transactionalManager ?? this.globalEntityManager;

    return await manager
      .getRepository(CommunicationImage)
      .save(createCommunicationImageDto);
  }

  findAll() {
    return this.communicationImageRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} communicationImage`;
  }

  update(
    id: number,
    _updateCommunicationImageDto: UpdateCommunicationImageDto,
  ) {
    return `This action updates a #${id} communicationImage`;
  }

  async delete(communicationIds: number[], transactionalManager?: EntityManager) {

    const manager = transactionalManager ?? this.globalEntityManager;
    
    if (communicationIds.length === 0) {
      return; 
    }
  
    await manager.getRepository(CommunicationImage).delete({
      id: In(communicationIds), 
    });
  }
  
}

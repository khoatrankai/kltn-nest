import { Injectable } from '@nestjs/common';
import { CreateCommunicationCommentImageDto } from './dto/create-communication-comment-image.dto';
import { EntityManager } from 'typeorm';
import { CommunicationCommentImage } from './entities/communication-comment-image.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommunicationCommentImagesService {
  constructor(
    @InjectRepository(CommunicationCommentImage)
    private readonly globalEntityManager: EntityManager,
  ) {}
  async createMany(
    createCommunicationCommentImageDto: CreateCommunicationCommentImageDto[],
    transactionalManager?: EntityManager,
  ) {
    const manager = transactionalManager ?? this.globalEntityManager;

    return await manager
      .getRepository(CommunicationCommentImage)
      .save(createCommunicationCommentImageDto);
  }

  async delete(commentId: number, transactionalManager?: EntityManager) {
    const manager = transactionalManager ?? this.globalEntityManager;
    await manager
      .getRepository(CommunicationCommentImage)
      .delete({ commentId });
  }
}

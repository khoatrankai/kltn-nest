import { CommunicationViewsService } from './../communication-views/communication-views.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommunicationLikeDto } from './dto/create-communication-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommunicationLike } from './entities/communication-like.entity';

@Injectable()
export class CommunicationLikesService {
  constructor(
    @InjectRepository(CommunicationLike)
    private readonly communicationsLikeRepository: Repository<CommunicationLike>,
    private readonly communicationViewsService: CommunicationViewsService,
  ) {}
  async createOrDelete(createCommunicationLikeDto: CreateCommunicationLikeDto) {
    try {
      const existingLike = await this.communicationsLikeRepository.findOne({
        where: {
          communicationId: createCommunicationLikeDto.communicationId,
          accountId: createCommunicationLikeDto.accountId,
        },
      });

      if (existingLike) {
        await this.communicationsLikeRepository.delete({
          communicationId: createCommunicationLikeDto.communicationId,
          accountId: createCommunicationLikeDto.accountId,
        });
        return 
      }

      const newCommunicationLike = this.communicationsLikeRepository.create(
        createCommunicationLikeDto,
      );

      this.communicationViewsService.create({
        accountId: createCommunicationLikeDto.accountId,
        communicationId: createCommunicationLikeDto.communicationId,
      })

      return await this.communicationsLikeRepository.save(newCommunicationLike);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException(
        'Error creating or deleting communication likes',
      );
    }
  }

  async countCommunicationLikes(id: number) {
    try {
      const likeCount = await this.communicationsLikeRepository.count({
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

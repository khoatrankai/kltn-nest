import { CommunicationViewsService } from './../communication-views/communication-views.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommunicationBookmarkedDto } from './dto/create-communication-bookmarked.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunicationBookmarked } from './entities/communication-bookmarked.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommunicationBookmarkedService {
  constructor(
    @InjectRepository(CommunicationBookmarked)
    private readonly communicationBookmarkedRepository: Repository<CommunicationBookmarked>,
    private readonly communicationViewsService: CommunicationViewsService,
  ) { }
  async create(
    createCommunicationBookmarkedDto: CreateCommunicationBookmarkedDto,
  ) {
    try {
      const existing = await this.communicationBookmarkedRepository.findOne({
        where: {
          communicationId: createCommunicationBookmarkedDto.communicationId,
          accountId: createCommunicationBookmarkedDto.accountId,
        },
      });

      if (existing) {
        await this.communicationBookmarkedRepository.delete({
          communicationId: createCommunicationBookmarkedDto.communicationId,
          accountId: createCommunicationBookmarkedDto.accountId,
        });
        return;
      }

      const newCommunicationBookmarked =
        this.communicationBookmarkedRepository.create(
          createCommunicationBookmarkedDto,
        );

      this.communicationViewsService.create({
        accountId: createCommunicationBookmarkedDto.accountId,
        communicationId: createCommunicationBookmarkedDto.communicationId,
      });

      return await this.communicationBookmarkedRepository.save(
        newCommunicationBookmarked,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException(
        'Error creating or deleting communication likes',
      );
    }
  }

  async findOne(id: string, limit: number, page: number) {
    const total = await this.communicationBookmarkedRepository.count({
      where: {
        accountId: id,
      },
    });

    const queryBuilder = this.communicationBookmarkedRepository
      .createQueryBuilder('communicationBookmarked')
      .leftJoinAndSelect(
        'communicationBookmarked.communication',
        'communication',
      )
      .leftJoinAndSelect(
        'communication.communicationLikes',
        'communicationLikes',
        `communicationLikes.accountId = :accountId`,
      )
      .leftJoinAndSelect(
        'communication.communicationViews',
        'communicationViews',
      )
      .leftJoinAndSelect(
        'communication.communicationComments',
        'communicationComments',
      )
      .leftJoinAndSelect(
        'communication.communicationImages',
        'communicationImages',
      )
      .leftJoinAndSelect('communication.profile', 'profile')
      .loadRelationCountAndMap(
        'communication.communicationLikesCount',
        'communication.communicationLikes',
        'communicationLikesCount',
      )
      .loadRelationCountAndMap(
        'communication.communicationViewsCount',
        'communication.communicationViews',
        'communicationViewsCount',
      )
      .loadRelationCountAndMap(
        'communication.communicationCommentsCount',
        'communication.communicationComments',
        'communicationCommentsCount',
      )
      .where('communicationBookmarked.accountId = :id', { id })
      .setParameter('accountId', id)
      .orderBy('communicationBookmarked.createdAt', 'DESC')
      .take(limit)
      .skip(page * limit);

    const result = await queryBuilder.getMany();

    return {
      total,
      data: result,
      is_over:
        result.length === total ? true : result.length < limit ? true : false,
    };
  }
}

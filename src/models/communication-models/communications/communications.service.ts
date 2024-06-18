import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommunicationDto } from './dto/create-communication.dto';
import { UpdateCommunicationDto } from './dto/update-communication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Communication } from './entities/communication.entity';
import { Repository } from 'typeorm';
import { CreateCommunicationTransaction } from './transactions/create-communication.transaction';
import { UpdateCommunicationTransaction } from './transactions/update-communication.transaction';
import { UpdateCommunicationAdminTransaction } from './transactions/update-communication-admin.transaction';
import { CommunicationViewsService } from '../communication-views/communication-views.service';

@Injectable()
export class CommunicationsService {
  constructor(
    @InjectRepository(Communication)
    private readonly communicationRepository: Repository<Communication>,
    private readonly createCommunicationTransaction: CreateCommunicationTransaction,
    private readonly updateCommunicationTransaction: UpdateCommunicationTransaction,
    private readonly updateCommunicationAdminTransaction: UpdateCommunicationAdminTransaction, 
    private readonly communicationViewsService: CommunicationViewsService, 
  ) {}

  handleSort(data: Communication[], sort?: string) {
    if (sort === 'l') {
      const dataWithLikesLength = data.map((item) => {
        return {
          ...item,
          communicationLikesLength: item.communicationLikes.length,
        };
      });

      const sortedData = dataWithLikesLength.sort((a, b) => {
        return b.communicationLikesLength - a.communicationLikesLength;
      });

      return sortedData;
    } else if (sort === 'v') {
      const dataWithViewsLength = data.map((item) => {
        return {
          ...item,
          communicationViewsLength: item.communicationViews.length,
        };
      });

      const sortedData = dataWithViewsLength.sort((a, b) => {
        return b.communicationViewsLength - a.communicationViewsLength;
      });

      return sortedData;
    } else if (sort === 'cm') {
      const dataWithCommentsLength = data.map((item) => {
        return {
          ...item,
          communicationCommentsLength: item.communicationComments.length,
        };
      });

      const sortedData = dataWithCommentsLength.sort((a, b) => {
        return b.communicationCommentsLength - a.communicationCommentsLength;
      });

      return sortedData;
    }

    return data;
  }

  async create(createCommunicationDto: CreateCommunicationDto) {
    try {
      const newCommunication = await this.createCommunicationTransaction.run(
        createCommunicationDto,
      );

      return newCommunication;
    } catch (error) {
      throw error;
    }
  }

  // find by account

  async findCommunicationByAccountId(
    id: string,
    limit: number,
    page: number,
    sort?: string,
  ) {
    const total = await this.communicationRepository.count({
      where: {
        accountId: id,
      },
    });

    const data = await this.communicationRepository.find({
      where: {
        accountId: id,
      },
      relations: [
        'communicationImages',
        'communicationCategories',
        'communicationCategories.parentCategory',
        'profile',
        'communicationViews',
        'communicationLikes',
        'communicationComments',
      ],
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: page * limit,
    });

    const dataSort = this.handleSort(data, sort);

    return {
      total,
      data: dataSort,
      is_over:
        data.length === total ? true : data.length < limit ? true : false,
    };
  }

  async update(updateCommunicationDto: UpdateCommunicationDto) {
    try {
      const newCommunication = await this.updateCommunicationTransaction.run(
        updateCommunicationDto,
      );

      return newCommunication;
    } catch (error) {
      throw error;
    }
  }

  async getCommunicationByCommunicationId(
    id: number,
    accountId: string,
  ): Promise<Communication | undefined> {
    const communication = await this.communicationRepository
      .createQueryBuilder('communications')
      .select([
        'communications.id',
        'communications.title',
        'communications.content',
        'communications.type',
        'communications.createdAt',
        'communications.updatedAt',
        'communications.status',
      ])
      .leftJoinAndSelect(
        'communications.communicationImages',
        'communicationImages',
      )
      .leftJoinAndSelect(
        'communications.communicationCategories',
        'communicationCategories',
      )
      .leftJoinAndSelect(
        'communicationCategories.parentCategory',
        'parentCategory',
      )
      .leftJoinAndSelect('communications.profile', 'profile')
      .leftJoin(
        'communications.communicationViews',
        'communicationViews',
        'communicationViews.accountId = :accountId',
      )
      .leftJoinAndSelect(
        'communications.communicationLikes',
        'communicationLikes',
        'communicationLikes.accountId = :accountId',
      )
      .leftJoinAndSelect(
        'communications.communicationBookmarked',
        'communicationBookmarked',
        'communicationBookmarked.accountId = :accountId',
      )
      .leftJoinAndSelect(
        'communications.communicationComments',
        'communicationComments',
      )
      .leftJoinAndSelect(
        'communicationComments.communicationCommentImages',
        'communicationCommentImages',
      )
      .leftJoinAndSelect(
        'communicationComments.profile',
        'communicationCommentsProfile',
      )
      .loadRelationCountAndMap(
        'communications.communicationViewsCount',
        'communications.communicationViews',
      )
      .loadRelationCountAndMap(
        'communications.communicationLikesCount',
        'communications.communicationLikes',
      )
      .loadRelationCountAndMap(
        'communications.communicationCommentsCount',
        'communications.communicationComments',
      )
      .where('communications.id = :id', { id })
      .setParameter('accountId', accountId)
      .getOne();

    if (communication) {
      this.communicationViewsService.create({
        communicationId: id,
        accountId: accountId,
      });
      return communication;
    }

    return undefined;
  }

  // update by admin

  async updateByAdmin(updateCommunicationDto: UpdateCommunicationDto) {
    try {
      const newCommunication =
        await this.updateCommunicationAdminTransaction.run(
          updateCommunicationDto,
        );
      return newCommunication;
    } catch (error) {
      throw error;
    }
  }

  // find five working story
  async findCommunicationsByType(
    limit: number,
    page: number,
    type: number = 0,
    sort?: string,
    _accountId?: string,
  ) {
    // count all by communication id
    // sort by sortQuery
    // get list id with limit and page
    // return list id

    let listId = [];
    let total: number = 0;
    switch (sort) {
      case 'l':
        listId = await this.communicationRepository.query(`
          SELECT communications.id, COUNT(communication_likes.communication_id) as likeCount
          FROM communications
          LEFT JOIN communication_likes ON communications.id = communication_likes.communication_id
          WHERE communications.type = ${type} AND communications.status = 1
          GROUP BY communications.id
          ORDER BY likeCount DESC, communications.created_at DESC
          LIMIT ${limit} OFFSET ${page * limit}
        `);
        break;
      case 'v':
        listId = await this.communicationRepository.query(`
          SELECT communications.id, COUNT(communication_views.communication_id) as viewCount
          FROM communications
          LEFT JOIN communication_views ON communications.id = communication_views.communication_id
          WHERE communications.type = ${type} AND communications.status = 1
          GROUP BY communications.id
          ORDER BY viewCount DESC
          LIMIT ${limit} OFFSET ${page * limit}
        `);
        break;
      case 'cm':
        listId = await this.communicationRepository.query(`
          SELECT communications.id, COUNT(communication_comments.communication_id) as commentCount
          FROM communications
          LEFT JOIN communication_comments ON communications.id = communication_comments.communication_id
          WHERE communications.type = ${type} AND communications.status = 1
          GROUP BY communications.id
          ORDER BY commentCount DESC
          LIMIT ${limit} OFFSET ${page * limit}
        `);
        break;
      default:
        listId = await this.communicationRepository.query(`
          SELECT communications.id
          FROM communications
          WHERE communications.type = ${type} AND communications.status = 1
          ORDER BY communications.created_at DESC
          LIMIT ${limit} OFFSET ${page * limit}
        `);
        break;
    }

    if (listId.length === 0) {
      total = await this.communicationRepository.count({
        where: {
          type: type,
        },
      });

      return {
        total,
        is_over: true,
        data: [],
      };
    }

    // get data by id
    const data = await this.communicationRepository
      .createQueryBuilder('communications')
      .select([
        'communications.id',
        'communications.title',
        'communications.content',
        'communications.type',
        'communications.createdAt',
        'communications.updatedAt',
        'communications.status',
      ])
      .leftJoinAndSelect(
        'communications.communicationImages',
        'communicationImages',
      )
      .leftJoinAndSelect(
        'communications.communicationCategories',
        'communicationCategories',
      )
      .leftJoinAndSelect(
        'communicationCategories.parentCategory',
        'parentCategory',
      )
      .loadRelationCountAndMap(
        'communications.communicationViewsCount',
        'communications.communicationViews',
      )
      .loadRelationCountAndMap(
        'communications.communicationLikesCount',
        'communications.communicationLikes',
      )
      .loadRelationCountAndMap(
        'communications.communicationCommentsCount',
        'communications.communicationComments',
      )
      .leftJoinAndSelect('communications.profile', 'profile')
      .leftJoinAndSelect(
        'communications.communicationBookmarked',
        'communicationBookmarked',
        'communicationBookmarked.accountId = :_accountId',
      )
      .leftJoinAndSelect(
        'communications.communicationLikes',
        'communicationLikes',
        'communicationLikes.accountId = :_accountId',
      )
      .where('communications.id IN (:...listId)', {
        listId: listId.map((item: any) => item.id),
      })
      .orderBy(
        `FIELD(communications.id, ${listId
          .map((item: any) => item.id)
          .join(',')})`,
      )
      .setParameter('_accountId', _accountId)
      .getMany();

    const check = await this.communicationRepository.count({
      where: {
        type: type,
      },
    });

    return {
      total: check,
      data,
      is_over:
        data.length === check ? true : data.length < limit ? true : false,
    };
  }

  async deleteCommunication(id: number, accountId: string) {
    try {
      const communication = await this.communicationRepository.findOne({
        where: {
          id,
          accountId: accountId,
        },
      });

      if (!communication) {
        throw new BadRequestException('Not found communication');
      }

      await this.communicationRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }


  async deleteCommunicationByAdmin(id: number) {
    try {
      const communication = await this.communicationRepository.findOne({
        where: {
          id
        },
      });

      if (!communication) {
        throw new BadRequestException('Not found communication');
      }

      await this.communicationRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

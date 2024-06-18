import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserPointHistoryDto } from './dto/create-user-point-history.dto';
import { UserPointHistory } from './entities/user-point-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserPointHistoriesService {
  constructor(
    @InjectRepository(UserPointHistory)
    private userPointHistoryRepository: Repository<UserPointHistory>,
  ) { }
  async create(createUserPointHistoryDto: CreateUserPointHistoryDto) {
    try {
      const newData = this.userPointHistoryRepository.create(createUserPointHistoryDto);

      return this.userPointHistoryRepository.save(newData);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all userPointHistories`;
  }

  async findOne(_orderId?:string | undefined, _amount?:number | undefined, type?:string) {
    try {
      const data = await this.userPointHistoryRepository.findOne({
        where: type === 'amount' ? { amount: _amount ? (_amount / 100) : 100 } : { orderId: _orderId }
      });

      if (!data) {
        throw new BadRequestException('Not found');
      }

      return data;
      
    } catch (error) {
      throw error;
    }    
  }

  async findOneByStatus(orderId: string, status: number) {
    try {
      const data = await this.userPointHistoryRepository.findOne({
        where: { orderId, status }
      });

      return data;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, status: number) {
    try {
      await this.userPointHistoryRepository.update({
        orderId: id
      }, { status });
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} userPointHistory`;
  }
}

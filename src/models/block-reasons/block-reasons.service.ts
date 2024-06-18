import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBlockReasonDto } from './dto/create-block-reason.dto';
import { UpdateBlockReasonDto } from './dto/update-block-reason.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockReason } from './entities/block-reason.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlockReasonsService {
  constructor(
    @InjectRepository(BlockReason)
    private blockReasonRepository: Repository<BlockReason>
  ) {

  }
  async createService(createBlockReasonDto: CreateBlockReasonDto) {
    try {

      const blockReason = this.blockReasonRepository.create(createBlockReasonDto);

      return await this.blockReasonRepository.save(blockReason);
    } catch (error) {
      throw error;
    }
  }

  async findAll(type: number) {
    try {
      return await this.blockReasonRepository.find({
        where: {
          status: type,
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateBlockReasonDto: UpdateBlockReasonDto) {
    try {
      const checkBlockReason = await this.blockReasonRepository.findOne({
        where: {
          id,
        }
      });

      if (!checkBlockReason) {
        throw new BadRequestException('Block reason not found');
      }

      await this.blockReasonRepository.update(id, updateBlockReasonDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
      try {
        
        const checkBlockReason = await this.blockReasonRepository.findOne({
          where: {
            id,
          }
        });

        if (!checkBlockReason) {
          throw new BadRequestException('Block reason not found');
        }

        await this.blockReasonRepository.delete(id);

      } catch (error) {
        throw error;
      }
  }

  async findById(id: number) {
    try {
      return await this.blockReasonRepository.findOne({
        where: {
          id,
        }
      });
    } catch (error) {
      throw error;
    }
  }
}

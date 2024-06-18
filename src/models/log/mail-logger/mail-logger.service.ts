import { Injectable } from '@nestjs/common';
import { CreateMailLoggerDto } from './dto/create-mail-logger.dto';
import { UpdateMailLoggerDto } from './dto/update-mail-logger.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MailLogger } from './entities/mail-logger.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MailLoggerService {

  constructor(
    @InjectRepository(MailLogger)
    private mailLoggerRepository: Repository<MailLogger>
  ) { }

  create(createMailLoggerDto: CreateMailLoggerDto[]) {
    return this.mailLoggerRepository.save(createMailLoggerDto);
  }

  findAll() {
    return `This action returns all mailLogger`;
  }

  findOne(recipient: string, subject: string) {
    return this.mailLoggerRepository.findOne({
      where: {
        recipient,
        subject
      }
    });
  }

  update(id: number, _updateMailLoggerDto: UpdateMailLoggerDto) {
    return `This action updates a #${id} mailLogger`;
  }

  remove(id: number) {
    return `This action removes a #${id} mailLogger`;
  }
}

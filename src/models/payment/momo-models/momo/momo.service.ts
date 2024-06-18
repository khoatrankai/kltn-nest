import { Injectable } from '@nestjs/common';
import { CreateMomoDto } from './dto/create-momo.dto';
import { UpdateMomoDto } from './dto/update-momo.dto';

@Injectable()
export class MomoService {
  create(_createMomoDto: CreateMomoDto) {
    return 'This action adds a new momo';
  }

  findAll() {
    return `This action returns all momo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} momo`;
  }

  update(id: number, _updateMomoDto: UpdateMomoDto) {
    return `This action updates a #${id} momo`;
  }

  remove(id: number) {
    return `This action removes a #${id} momo`;
  }
}

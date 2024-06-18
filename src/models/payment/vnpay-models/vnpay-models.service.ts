import { Injectable } from '@nestjs/common';
import { CreateVnpayModelDto } from './dto/create-vnpay-model.dto';
import { UpdateVnpayModelDto } from './dto/update-vnpay-model.dto';

@Injectable()
export class VnpayModelsService {
  create(_createVnpayModelDto: CreateVnpayModelDto) {
    return 'This action adds a new vnpayModel';
  }

  findAll() {
    return `This action returns all vnpayModels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vnpayModel`;
  }

  update(id: number, _updateVnpayModelDto: UpdateVnpayModelDto) {
    return `This action updates a #${id} vnpayModel`;
  }

  remove(id: number) {
    return `This action removes a #${id} vnpayModel`;
  }
}

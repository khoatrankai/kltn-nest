import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Province } from './entities';
import { Repository } from 'typeorm';
// import { CreateProvinceDto } from './dto/create-province.dto';
// import { UpdateProvinceDto } from './dto/update-province.dto';

@Injectable()
export class ProvincesService {
  @InjectRepository(Province)
  private readonly provincesRepository!: Repository<Province>;

  findAll() {
    return this.provincesRepository.find();
  }

  findOne(id: string) {
    return this.provincesRepository.findOne({
      where: {
        id: id
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} province`;
  }
}

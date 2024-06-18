import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { District } from './entities';
import { Repository } from 'typeorm';
// import { CreateProvinceDto } from './dto/create-province.dto';
// import { UpdateProvinceDto } from './dto/update-province.dto';

@Injectable()
export class DistrictsService {
  @InjectRepository(District)
  private readonly distrcitsRepository!: Repository<District>;
  // create(createProvinceDto: CreateProvinceDto) {
  //   return 'This action adds a new province';
  // }

  findAll() {
    return this.distrcitsRepository.find();
  }

  findOne(id: string) {
    return this.distrcitsRepository.findOne({
      where: {
        id: id
      }
    });
  }

  findByProvinceId(provinceId: string) {
    return this.distrcitsRepository.find({
      relations: {
        province: true
      },
      where: {
        province: {
          id: provinceId
        }
      }      
    });
  }

  // update(id: number, updateProvinceDto: UpdateProvinceDto) {
  //   return `This action updates a #${id} province`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} province`;
  // }
}

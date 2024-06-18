import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ward } from './entities';
import { Repository } from 'typeorm';
// import { CreateProvinceDto } from './dto/create-province.dto';
// import { UpdateProvinceDto } from './dto/update-province.dto';

@Injectable()
export class WardsService {
  @InjectRepository(Ward)
  private readonly wardsRepository!: Repository<Ward>;
  // create(createProvinceDto: CreateProvinceDto) {
  //   return 'This action adds a new province';
  // }

  findAll() {
    return this.wardsRepository.find();
  }
  
  findOne(id: string) {
    return this.wardsRepository.findOne({
      where: {
        id: id
      }
    });
  }

  findByDistrictId(districtId: string) {
    return this.wardsRepository.find({
      where: {
        districtId: districtId
      }      
    });
  }

  findDistrictAndProvinceByWardId(wardId: string) {
    return this.wardsRepository.findOne({
      where: {
        id: wardId
      },
      relations: ['district', 'district.province']
    });
  }

  // update(id: number, updateProvinceDto: UpdateProvinceDto) {
  //   return `This action updates a #${id} province`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} province`;
  // }
}

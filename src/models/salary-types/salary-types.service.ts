import { Injectable } from '@nestjs/common';
import { CreateSalaryTypeDto } from './dto/create-salary-type.dto';
import { UpdateSalaryTypeDto } from './dto/update-salary-type.dto';

@Injectable()
export class SalaryTypesService {
  create(createSalaryTypeDto: CreateSalaryTypeDto) {
    console.log(createSalaryTypeDto);
    return 'This action adds a new salaryType';
  }

  findAll() {
    return `This action returns all salaryTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} salaryType`;
  }

  update(id: number, updateSalaryTypeDto: UpdateSalaryTypeDto) {
    console.log(updateSalaryTypeDto);
    return `This action updates a #${id} salaryType`;
  }

  remove(id: number) {
    return `This action removes a #${id} salaryType`;
  }
}

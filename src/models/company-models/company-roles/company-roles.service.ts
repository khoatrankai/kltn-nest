import { Injectable } from '@nestjs/common';
import { CreateCompanyRoleDto } from './dto/create-company-role.dto';
import { UpdateCompanyRoleDto } from './dto/update-company-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyRole } from './entities/company-role.entity';

@Injectable()
export class CompanyRolesService {
  constructor(
    @InjectRepository(CompanyRole)
    private readonly companyRoleRepository: Repository<CompanyRole>,
  ) { }
  create(_createCompanyRoleDto: CreateCompanyRoleDto) {
    return 'This action adds a new companyRole';
  }

  findAll() {
    return this.companyRoleRepository.find(
      {
        where: {
          status: 1
        }
      }
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} companyRole`;
  }

  update(id: number, _updateCompanyRoleDto: UpdateCompanyRoleDto) {
    return `This action updates a #${id} companyRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyRole`;
  }
}

import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Req,
  UseInterceptors,
  // Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { CompanyRolesService } from './company-roles.service';
import { CompanyRoleSerialization } from './serialization/company-role.serializarion';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { ApiTags } from '@nestjs/swagger';
// import { CreateCompanyRoleDto } from './dto/create-company-role.dto';
// import { UpdateCompanyRoleDto } from './dto/update-company-role.dto';

@ApiTags('Company-roles')
@Controller('company-roles')
export class CompanyRolesController {
  constructor(private readonly companyRolesService: CompanyRolesService) {}

  // @Post()
  // create(@Body() createCompanyRoleDto: CreateCompanyRoleDto) {
  //   return this.companyRolesService.create(createCompanyRoleDto);
  // }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@Req() r: CustomRequest) {
    return this.companyRolesService.findAll().then((companyRoles) => {
      return companyRoles.map((companyRole) => {
        return Object.assign(new CompanyRoleSerialization(companyRole, r.lang));
      });
    })
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.companyRolesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCompanyRoleDto: UpdateCompanyRoleDto) {
  //   return this.companyRolesService.update(+id, updateCompanyRoleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.companyRolesService.remove(+id);
  // }
}

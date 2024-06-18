import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalaryTypesService } from './salary-types.service';
import { CreateSalaryTypeDto } from './dto/create-salary-type.dto';
import { UpdateSalaryTypeDto } from './dto/update-salary-type.dto';

@Controller('salary-types')
export class SalaryTypesController {
  constructor(private readonly salaryTypesService: SalaryTypesService) {}

  @Post()
  create(@Body() createSalaryTypeDto: CreateSalaryTypeDto) {
    return this.salaryTypesService.create(createSalaryTypeDto);
  }

  @Get()
  findAll() {
    return this.salaryTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salaryTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalaryTypeDto: UpdateSalaryTypeDto) {
    return this.salaryTypesService.update(+id, updateSalaryTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salaryTypesService.remove(+id);
  }
}

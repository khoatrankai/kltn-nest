import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
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
import { CompanySizesService } from './company-sizes.service';
// import { CreateCompanySizeDto } from './dto/create-company-size.dto';
// import { UpdateCompanySizeDto } from './dto/update-company-size.dto';
import { ApiTags } from '@nestjs/swagger';
import { CompanySizeSerialization } from './serialization/company-size.serialization';

@ApiTags('Company-sizes')
@Controller('company-sizes')
export class CompanySizesController {
  constructor(private readonly companySizesService: CompanySizesService) { }

  // @Post()
  // create(@Body() createCompanySizeDto: CreateCompanySizeDto) {
  //   return this.companySizesService.create(createCompanySizeDto);
  // }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@Req() req: CustomRequest) {
    const companySizes = await this.companySizesService.findAll();
    return companySizes.map((companySize) => {
      return Object.assign(new CompanySizeSerialization(companySize, req.lang));
    });
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.companySizesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCompanySizeDto: UpdateCompanySizeDto) {
  //   return this.companySizesService.update(+id, updateCompanySizeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.companySizesService.remove(+id);
  // }
}

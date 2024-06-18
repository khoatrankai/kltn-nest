import { Controller, Get, Param, Req } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { ApiBadGatewayResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CustomErrorResponse, CustomSuccessResponse } from 'src/common/interfaces/customResponse.interface';
import { CDistrict } from './class/district.class';
import { DistrictSerializer } from './districts.serialization';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';

@ApiTags('Locations')
@Controller('locations/districts')
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) { }

  @Get('')
  @ApiBadGatewayResponse({
    description: 'Internal server error',
    type: CustomErrorResponse()
  })
  @ApiOkResponse({
    description: 'The records has been successfully retrieved.',
    type: CustomSuccessResponse(CDistrict, { isArray: true })
  })
  async findAll(@Req() req: CustomRequest): Promise<DistrictSerializer[]> {
    const lang = req['lang'];
    const districts = await this.districtsService.findAll();
    return districts.map(district => DistrictSerializer.serialize(district, lang));
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The record has been successfully retrieved.',
    type: CustomSuccessResponse(CDistrict)
  })
  async findOne(@Param('id') id: string, @Req() req: CustomRequest): Promise<DistrictSerializer> {
    const district = await this.districtsService.findOne(id);
    return DistrictSerializer.serialize(district, req['lang']);
  }

  @Get('province/:id')
  @ApiOkResponse({
    description: 'The records has been successfully retrieved.',
    type: CustomSuccessResponse(CDistrict, { isArray: true })
  })
  async findByProvince(@Param('id') id: string, @Req() req: CustomRequest): Promise<DistrictSerializer[]> {
    const districts = await this.districtsService.findByProvinceId(id);
    return districts.map(district => DistrictSerializer.serialize(district, req['lang']));
  }
}

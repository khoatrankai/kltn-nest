import { Controller, Get, Param, Req } from '@nestjs/common';
import { WardsService } from './wards.service';
import { ApiBadGatewayResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CustomErrorResponse, CustomSuccessResponse } from 'src/common/interfaces/customResponse.interface';
import { CWard } from './class/wards.class';
import { WardSerializer } from './wards.serialization';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';

@ApiTags('Locations')
@Controller('locations/wards')
export class WardsController {
  constructor(private readonly wardsService: WardsService) { }

  @Get('')
  @ApiBadGatewayResponse({
    description: 'Internal server error',
    type: CustomErrorResponse()
  })
  @ApiOkResponse({
    description: 'The records has been successfully retrieved.',
    type: CustomSuccessResponse(CWard, { isArray: true })
  })
  async findAll(@Req() req: CustomRequest): Promise<WardSerializer[]> {
    const lang = req['lang'];
    const wards = await this.wardsService.findAll();
    return wards.map(ward => WardSerializer.serialize(ward, lang));
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The record has been successfully retrieved.',
    type: CustomSuccessResponse(CWard)
  })
  async findOne(@Param('id') id: string, @Req() req: CustomRequest): Promise<WardSerializer> {
    const ward = await this.wardsService.findOne(id);
    return WardSerializer.serialize(ward, req['lang']);
  }

  @Get('district/:id')
  @ApiOkResponse({
    description: 'The records has been successfully retrieved.',
    type: CustomSuccessResponse(CWard, { isArray: true })
  })
  async findByDistrict(@Param('id') id: string, @Req() req: CustomRequest): Promise<WardSerializer[]> {
    const wards = await this.wardsService.findByDistrictId(id);
    return wards.map(ward => WardSerializer.serialize(ward, req['lang']));
  }
}

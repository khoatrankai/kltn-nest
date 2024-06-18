import { Controller, Get, Param } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { ApiBadGatewayResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CustomErrorResponse, CustomSuccessResponse, IResponse } from 'src/common/interfaces/customResponse.interface';
import { Province } from './entities';
import { IProvince } from './class/province.class';

@ApiTags('Locations')
@Controller('locations/provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) { }

  @Get('')
  @ApiBadGatewayResponse({
    description: 'Internal server error',
    type: CustomErrorResponse()
  })
  @ApiOkResponse({
    description: 'The records has been successfully retrieved.',
    type: CustomSuccessResponse(IProvince, { isArray: true })
  })
  async findAll(): Promise<IResponse<Province>> {
    try {
      const data = await this.provincesService.findAll();
      return {
        status: 'success',
        code: 200,
        message: 'Data successfully retrieved',
        data: data,
        request: {
          api: "/api/v3/provinces",
          method: 'GET'
        }
      }
    } catch (error) {
      return {
        status: 'error',
        code: 500,
        message: 'Internal server error',
        data: error,
        request: {
          api: "/api/v3/provinces",
          method: 'GET'
        }
      }
    }
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The record has been successfully retrieved.',
    type: CustomSuccessResponse(IProvince)
  })
  async findOne(@Param('id') id: string): Promise<IResponse<Province>> {
    try {
      const data = await this.provincesService.findOne(id);
      return {
        status: 'success',
        code: 200,
        message: 'Data successfully retrieved',
        data: data,
        request: {
          api: "/api/v3/provinces",
          method: 'GET'
        }
      }
    } catch (error) {
      return {
        status: 'error',
        code: 500,
        message: 'Internal server error',
        data: error,
        request: {
          api: "/api/v3/provinces",
          method: 'GET'
        }
      }
    }
  }
}

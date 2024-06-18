import { Controller, Get, Post, Body, UseGuards, Req, BadRequestException, UseInterceptors, ClassSerializerInterceptor, Delete, Param } from '@nestjs/common';
import { ServiceHistoryService } from './service-history.service';
import { CreateServiceHistoryDto } from './dto/create-service-history.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { AllServiceHistoryInterceptor } from './interceptor/service-history.interceptor';

@ApiTags('Service History')
@Controller('service-history')
export class ServiceHistoryController {
  constructor(private readonly serviceHistoryService: ServiceHistoryService) { }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async create(@Body() createServiceHistoryDto: CreateServiceHistoryDto, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account ID is required');
      }

      createServiceHistoryDto.accountId = accountId;

      const message = await this.serviceHistoryService.create(createServiceHistoryDto);

      return {
        status: message.status,
        message: message.message,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor, AllServiceHistoryInterceptor)
  async findAll(@Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;
      if (!accountId) {
        throw new BadRequestException('Account ID is required');
      }

      return await this.serviceHistoryService.findAll(accountId);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async delete(@Req() req: CustomRequest, @Param('id') id: string) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account ID is required');
      }

      const message = await this.serviceHistoryService.delete(accountId, +id);

      return {
        status: 200,
        data: message,
      };
    } catch (error) {
      throw error;
    }
  }
}

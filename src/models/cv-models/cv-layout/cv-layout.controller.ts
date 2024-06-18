import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, BadRequestException, HttpStatus, Query } from '@nestjs/common';
import { CvLayoutService } from './cv-layout.service';
import { CreateCvLayoutDto } from './dto/create-cv-layout.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';

@ApiTags('Cv Layout')
@Controller('cv-layout')
export class CvLayoutController {
  constructor(private readonly cvLayoutService: CvLayoutService) { }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(@Body() createCvLayoutDto: CreateCvLayoutDto, @Req() req: CustomRequest) {
    try {

      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account ID is required');
      }

      createCvLayoutDto.accountId = accountId;
      const data = await this.cvLayoutService.create(createCvLayoutDto);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Cv Layout created successfully',
        data: data
      }
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiQuery({
    name: 'cvIndex',
    required: true,
    type: Number
  })
  async findAll(@Req() req: CustomRequest, @Query('cvIndex') cvIndex: number) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account ID is required');
      }

      const data = await this.cvLayoutService.findAll(accountId, cvIndex);


      return {
        statusCode: HttpStatus.OK,
        message: 'Cv Layout fetched successfully',
        data: data
      }
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account ID is required');
      }

      const data = await this.cvLayoutService.remove(+id, accountId);

      return {
        statusCode: HttpStatus.OK,
        message: `${data} Cv Layout deleted successfully`,
      }
    } catch (error) {
      throw error;
    }
  }
}

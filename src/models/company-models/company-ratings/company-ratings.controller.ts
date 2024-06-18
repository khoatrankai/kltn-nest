import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CompanyRatingsService } from './company-ratings.service';
import { CreateCompanyRatingDto } from './dto/create-company-rating.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CompanyRatingsInterceptor } from './interceptor/company-ratings.interceptor';

@ApiTags('Company Ratings')
@Controller('company-ratings')
export class CompanyRatingsController {
  constructor(private readonly companyRatingsService: CompanyRatingsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(
    @Body() createCompanyRatingDto: CreateCompanyRatingDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account id is required');
      }

      createCompanyRatingDto.accountId = accountId;

      return await this.companyRatingsService.create(createCompanyRatingDto);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error');
    }
  }

  @Get('account/company/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async findOneByAccountId(
    @Param('id') id: string,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account id is required');
      }

      const data = await this.companyRatingsService.findOneByAccountId(
        +id,
        accountId,
      );

      return {
        statusCode: HttpStatus.OK,
        data
      }
    } catch (error) {
      throw error;
    }
  }

  @Get('company/:id')
  @UseInterceptors(ClassSerializerInterceptor, CompanyRatingsInterceptor)
  async findOne(@Param('id') id: string, @Req() req: any) {
    try {

      const { limit, page } = req.query;

      return await this.companyRatingsService.findOne(+id, limit ? +limit : 10, page ? +page : 0);
    } catch (error) {
      throw error;
    }
  }

  @Delete('account/company/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account id is required');
      }
      await this.companyRatingsService.remove(+id, accountId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Delete company rating successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error');
    }
  }
}

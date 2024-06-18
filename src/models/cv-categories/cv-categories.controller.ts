import { Controller, Get, Post, Body, Delete, UseGuards, Req, BadRequestException, HttpStatus } from '@nestjs/common';
import { CvCategoriesService } from './cv-categories.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateArrayCvCategory } from './dto/array-create-cv-category';
import { AuthGuard } from 'src/authentication/auth.guard';
import { DeleteCvCategoriesDto } from './dto/delete-cv-categories.dto';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';

@Controller('cv-categories')
@ApiTags('Cv Categories AI')
export class CvCategoriesController {
  constructor(private readonly cvCategoriesService: CvCategoriesService) { }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(@Body() createCvCategoryDto: CreateArrayCvCategory, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account id is required');
      }

      createCvCategoryDto.accountId = accountId;

      const data = await this.cvCategoriesService.create(createCvCategoryDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Create cv category successfully',
        data
      }
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiQuery({
    name: 'cvIndex',
    required: true,
    type: 'number',
    description: 'Cv index'
  })
  async findAll(@Req() req: CustomRequest, @Req() reqCv: any) {
    try {
      const accountId = req.user?.id;
      const cvIndex = reqCv.query.cvIndex;

      if (!accountId) {
        throw new BadRequestException('Account id is required');
      }

      const data = await this.cvCategoriesService.findAll( accountId, cvIndex );

      return {
        statusCode: HttpStatus.OK,
        message: 'Get all cv categories successfully',
        data
      }
    } catch (error) {
      throw error;
    }
  }

  @Delete('')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async remove(@Body() deleteCvCategoryDto: DeleteCvCategoriesDto, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account id is required');
      }

      deleteCvCategoryDto.accountId = accountId;

      const data = await this.cvCategoriesService.remove(deleteCvCategoryDto);

      return {
        statusCode: HttpStatus.OK,
        message: `Delete ${data.affected} cv category successfully`,
      };

    } catch (error) {
      throw error;
    }
  }
}

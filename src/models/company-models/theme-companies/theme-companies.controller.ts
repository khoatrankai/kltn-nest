import { Controller, Get, Post, Body, Param, UseGuards, ClassSerializerInterceptor, UseInterceptors, UploadedFiles, Req, BadRequestException, HttpStatus, Put } from '@nestjs/common';
import { ThemeCompaniesService } from './theme-companies.service';
import { CreateThemeCompanyDto } from './dto/create-theme-company.dto';
import { UpdateThemeCompanyDto } from './dto/update-theme-company.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { DetailThemeCompaniesInterceptor } from './interceptor/detail-theme-companies.interceptor';

@Controller('theme-companies')
@ApiTags('Theme Companies')
export class ThemeCompaniesController {
  constructor(private readonly themeCompaniesService: ThemeCompaniesService) { }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    ClassSerializerInterceptor,
    FileFieldsInterceptor(
      [
        { name: 'logoData', maxCount: 1 },
        { name: 'imageData', maxCount: 1 },
      ],
      {
        limits: {
          fileSize: 1024 * 1024 * 2,
        },
      },
    ),
  )
  async create(
    @Body() createThemeCompanyDto: CreateThemeCompanyDto,
    @UploadedFiles() files: { logoData: Express.Multer.File[], imageData: Express.Multer.File[] },
    @Req() req: CustomRequest
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Invalid account id');
      }

      createThemeCompanyDto.logoData = files.logoData[0];
      createThemeCompanyDto.imageData = files.imageData[0];
      createThemeCompanyDto.accountId = accountId;

      const data = await this.themeCompaniesService.create(createThemeCompanyDto);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Theme company created successfully',
        data
      }
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return {
        statusCode: HttpStatus.OK,
        message: 'Theme companies fetched successfully',
        data: await this.themeCompaniesService.findAll()
      }
    } catch (error) {
      throw error;
    }
  }

  @Get('own')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor, DetailThemeCompaniesInterceptor)
  async findOne(@Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;
      if (!accountId) {
        throw new BadRequestException('Invalid account id');
      }

      return await this.themeCompaniesService.findOne(accountId);

    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    ClassSerializerInterceptor,
    FileFieldsInterceptor(
      [
        { name: 'logoData', maxCount: 1 },
        { name: 'imageData', maxCount: 1 },
      ],
      {
        limits: {
          fileSize: 1024 * 1024 * 2,
        },
      },
    ),
  )
  async update(@Param('id') id: string, @Body() updateThemeCompanyDto: UpdateThemeCompanyDto, @UploadedFiles() files: { logoData: Express.Multer.File[], imageData: Express.Multer.File[] }, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Invalid account id');
      }

      updateThemeCompanyDto.logoData = files.logoData[0];
      updateThemeCompanyDto.imageData = files.imageData[0];
      updateThemeCompanyDto.accountId = accountId;

      const data = await this.themeCompaniesService.update(+id, updateThemeCompanyDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Theme company updated successfully',
        data
      }
    } catch (error) {
      throw error;
    }
  }
}

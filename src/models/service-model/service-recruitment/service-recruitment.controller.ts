import { Controller, Get, Post, Body, Param, UseGuards, Req, UseInterceptors, UploadedFiles, HttpStatus, ClassSerializerInterceptor, Put, BadRequestException, Delete } from '@nestjs/common';
import { ServiceRecruitmentService } from './service-recruitment.service';
import { CreateServiceRecruitmentDto } from './dto/create-service-recruitment.dto';
import { UpdateServiceRecruitmentDto } from './dto/update-service-recruitment.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enum';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ServiceRecruitmentInterceptor } from './interceptor/all-service-recruitment.interceptor';
import { OneServiceRecruitmentInterceptor } from './interceptor/one-service-recruitment.interceptor';
import { CompanyImagesPipe } from 'src/models/company-models/companies/interceptors/image.interceptor';

@ApiTags('Service Recruitment')
@Controller('service-recruitment')
export class ServiceRecruitmentController {
  constructor(private readonly serviceRecruitmentService: ServiceRecruitmentService) { }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    ClassSerializerInterceptor,
    FileFieldsInterceptor(
      [
        { name: 'logo', maxCount: 1 },
        { name: 'images', maxCount: 5 },
      ],
      {
        limits: {
          fileSize: 1024 * 1024 * 6,
        },
      },
    ),
  )
  async create(
    @Body() createServiceRecruitmentDto: CreateServiceRecruitmentDto,
    @Req() req: CustomRequest,
    @UploadedFiles(CompanyImagesPipe)
    imagesList: any | undefined,) {
    try {
      const accountId = req?.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account id not found');
      }

      if (createServiceRecruitmentDto.logo) {
        createServiceRecruitmentDto.logo = imagesList.logo;
      }
      createServiceRecruitmentDto.images = imagesList.images;

      const data = await this.serviceRecruitmentService.create(createServiceRecruitmentDto);

      if (!data) {
        throw new BadRequestException('Error creating service recruitment');
      }

      return {
        statusCode: HttpStatus.CREATED,
        data
      }
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor, ServiceRecruitmentInterceptor)
  async findAll() {
    try {
      return await this.serviceRecruitmentService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor, OneServiceRecruitmentInterceptor)
  async findOne(@Param('id') id: string) {
    try {
      return this.serviceRecruitmentService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 1 }]))
  async update(@Param('id') id: string, @Body() updateServiceRecruitmentDto: UpdateServiceRecruitmentDto, @UploadedFiles() files: { images: Express.Multer.File[] }) {
    try {
      if (files.images) {
        // updateServiceRecruitmentDto.images = files.images[0];
      }

      updateServiceRecruitmentDto.id = +id;

      await this.serviceRecruitmentService.update(updateServiceRecruitmentDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Service recruitment updated successfully'
      }
    } catch (error) {
      throw error;
    }
  }

  @Put(':id/status/:status')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  async updateStatus(@Param('id') id: string, @Param('status') status: number){
    try {

      await this.serviceRecruitmentService.updateStatus(+id, status);

      return {
        statusCode: HttpStatus.OK,
        message: 'Service recruitment status updated successfully'
      }
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string) {
    try {
      const data = await this.serviceRecruitmentService.remove(+id);

      return {
        statusCode: HttpStatus.OK,
        message: `${data.message}`
      }
    } catch (error) {
      throw error;
    }
  }
}

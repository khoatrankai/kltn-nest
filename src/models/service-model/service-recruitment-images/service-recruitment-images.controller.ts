import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ServiceRecruitmentImagesService } from './service-recruitment-images.service';
import { CreateServiceRecruitmentImageDto } from './dto/create-service-recruitment-image.dto';
import { UpdateServiceRecruitmentImageDto } from './dto/update-service-recruitment-image.dto';

@Controller('service-recruitment-images')
export class ServiceRecruitmentImagesController {
  constructor(private readonly serviceRecruitmentImagesService: ServiceRecruitmentImagesService) {}

  @Post()
  create(@Body() createServiceRecruitmentImageDto: CreateServiceRecruitmentImageDto) {
    return this.serviceRecruitmentImagesService.create(createServiceRecruitmentImageDto);
  }

  @Get()
  findAll() {
    return this.serviceRecruitmentImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceRecruitmentImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceRecruitmentImageDto: UpdateServiceRecruitmentImageDto) {
    return this.serviceRecruitmentImagesService.update(+id, updateServiceRecruitmentImageDto);
  }
}

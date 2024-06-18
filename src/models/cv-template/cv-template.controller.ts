import { Controller, Get, Param, ParseIntPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CvTemplateService } from './cv-template.service';
import { ApiTags } from '@nestjs/swagger';
import { CvTemplateInterceptor } from './interceptor/interceptor';

@ApiTags('Cv Template')
@Controller('cv-template')
export class CvTemplateController {
  constructor(private readonly cvTemplateService: CvTemplateService) {}

  @Get(':parentCategoryId')
  @UseInterceptors(ClassSerializerInterceptor, CvTemplateInterceptor)
  findAllByCategory(@Param("parentCategoryId", ParseIntPipe) parentCategoryId?: number) {
    return this.cvTemplateService.findAll(parentCategoryId);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor, CvTemplateInterceptor)
  findAll() {
    return this.cvTemplateService.findAll();
  }

}

import { Module } from '@nestjs/common';
import { CvTemplateService } from './cv-template.service';
import { CvTemplateController } from './cv-template.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvTemplate } from './entities/cv-template.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CvTemplate]),
  ],
  controllers: [CvTemplateController],
  providers: [CvTemplateService]
})
export class CvTemplateModule {}

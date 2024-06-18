import { Module } from '@nestjs/common';
import { ServiceRecruitmentImagesService } from './service-recruitment-images.service';
import { ServiceRecruitmentImagesController } from './service-recruitment-images.controller';

@Module({
  controllers: [ServiceRecruitmentImagesController],
  providers: [ServiceRecruitmentImagesService]
})
export class ServiceRecruitmentImagesModule {}
